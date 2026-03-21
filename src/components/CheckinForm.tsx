"use client";

import React, { useState, useEffect } from "react";
import { login, getLocations, checkin, Location } from "@/lib/api";

export default function CheckinForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [locationError, setLocationError] = useState("");
  const [userId, setUserId] = useState("");
  const [lastAction, setLastAction] = useState<string>("");

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await getLocations();
        if (response.success) {
          setLocations(response.locations);
        }
      } catch (error) {
        console.error("Error al obtener ubicaciones:", error);
      }
    };
    fetchLocations();
  }, []);

  useEffect(() => {
    const storedTheme =
      (localStorage.getItem("theme") as "light" | "dark" | null) || "dark";
    setTheme(storedTheme);
    document.body.dataset.theme = storedTheme;
    document.body.classList.toggle("dark", storedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.body.dataset.theme = next;
    document.body.classList.toggle("dark", next === "dark");
  };

  const getUserLocation = async () => {
    setLocationError("");
    if (!navigator.geolocation) {
      setLocationError("Geolocalización no disponible en tu navegador");
      return;
    }

    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          });
        },
      );

      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      setLocationError("");
    } catch (error) {
      setLocationError(
        "No pudimos acceder a tu ubicación. Asegúrate de haber dado permisos.",
      );
      console.error("Error de geolocalización:", error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await login(username, password);
      if (response.success && response.user) {
        setIsLoggedIn(true);
        setUserId(response.user.id);
        setMessage("Iniciaste sesión correctamente");
        setMessageType("success");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage(response.message || "Error en las credenciales");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Error de conexión con el servidor");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckin = async (action: "checkin" | "checkout") => {
    if (!userLocation) {
      setMessage("Por favor, obtén tu ubicación primero");
      setMessageType("error");
      return;
    }

    if (!selectedLocation) {
      setMessage("Selecciona una ubicación");
      setMessageType("error");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const response = await checkin(
        userId,
        selectedLocation,
        userLocation.lat,
        userLocation.lng,
        action,
      );
      if (response.success) {
        setMessage(response.message);
        setMessageType("success");
        setLastAction(
          `${action === "checkin" ? "Llegada" : "Salida"} a ${response.location}`,
        );
        setTimeout(() => setMessage(""), 5000);
      } else {
        setMessage(response.message);
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Error al procesar la solicitud");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="login-container rounded-lg p-10 space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h1
            className="text-2xl font-light tracking-wide"
            style={{ color: "var(--login-text)" }}
          >
            GeoHere
          </h1>
          <button
            type="button"
            onClick={toggleTheme}
            className="px-4 py-2 border transition btn-minimal-outline"
            style={{
              borderColor: "var(--login-border)",
              color: "var(--login-text)",
            }}
          >
            {theme === "dark" ? "☀️ Claro" : "🌙 Oscuro"}
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="login-label block mb-2">RUT o Nombre</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="12.345.678-9 o Juan Pérez"
              className="login-input w-full px-3 py-2 rounded-md text-sm"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="login-label block mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              className="login-input w-full px-3 py-2 rounded-md text-sm"
              disabled={isLoading}
            />
          </div>

          {message && (
            <div
              className={`p-3 rounded-md text-sm font-medium ${messageType === "success" ? "bg-emerald-100 text-emerald-900" : "bg-rose-100 text-rose-900"}`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="login-btn w-full py-2 px-4 rounded-md text-sm disabled:opacity-50"
          >
            {isLoading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="card-minimal w-full max-w-md space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h1
          className="text-xl font-light tracking-wide"
          style={{ color: "var(--login-text)" }}
        >
          Check-in
        </h1>
        <button
          type="button"
          onClick={toggleTheme}
          className="px-4 py-2 border transition btn-minimal-outline"
          style={{
            borderColor: "var(--login-border)",
            color: "var(--login-text)",
          }}
        >
          {theme === "dark" ? "☀️ Claro" : "🌙 Oscuro"}
        </button>
      </div>

      <div>
        <label className="login-label block mb-2">Ubicación</label>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="input-minimal w-full"
        >
          <option value="">-- Selecciona una ubicación --</option>
          {locations.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <button
          onClick={getUserLocation}
          disabled={isLoading}
          className="btn-minimal w-full disabled:opacity-50"
        >
          📍 {userLocation ? "Actualizar ubicación" : "Obtener ubicación"}
        </button>

        {userLocation && (
          <p className="text-xs opacity-60 text-center">
            Lat: {userLocation.lat.toFixed(4)}, Lng:{" "}
            {userLocation.lng.toFixed(4)}
          </p>
        )}
        {locationError && (
          <p className="text-xs text-red-600 dark:text-red-400 text-center">
            {locationError}
          </p>
        )}
      </div>

      {message && (
        <div className="p-3 rounded-md text-sm font-medium text-center border ${messageType === 'success' ? 'border-green-500 bg-green-50 text-green-900 dark:bg-green-900/20 dark:text-green-100' : 'border-red-500 bg-red-50 text-red-900 dark:bg-red-900/20 dark:text-red-100'}">
          {message}
        </div>
      )}

      {lastAction && (
        <div className="p-3 rounded-md text-sm font-medium text-center border border-current opacity-70">
          ✓ {lastAction}
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => handleCheckin("checkin")}
          disabled={isLoading || !userLocation || !selectedLocation}
          className="btn-minimal disabled:opacity-50"
        >
          ✓ Llegué
        </button>
        <button
          onClick={() => handleCheckin("checkout")}
          disabled={isLoading || !userLocation || !selectedLocation}
          className="btn-minimal disabled:opacity-50"
        >
          ✕ Me Voy
        </button>
      </div>

      <button
        onClick={() => {
          setIsLoggedIn(false);
          setUsername("");
          setPassword("");
          setMessage("");
        }}
        className="btn-minimal-outline w-full"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
