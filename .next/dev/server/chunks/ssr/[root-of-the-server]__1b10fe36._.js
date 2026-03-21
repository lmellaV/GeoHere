module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/GeoHere/src/lib/api.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checkin",
    ()=>checkin,
    "getLocations",
    ()=>getLocations,
    "login",
    ()=>login,
    "register",
    ()=>register
]);
const API_URL = ("TURBOPACK compile-time value", "http://localhost:3001") || "http://localhost:3001";
const register = async (name, rut)=>{
    const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            rut
        })
    });
    return response.json();
};
const login = async (username, password)=>{
    const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password
        })
    });
    return response.json();
};
const getLocations = async ()=>{
    const response = await fetch(`${API_URL}/api/locations`);
    return response.json();
};
const checkin = async (userId, locationId, latitude, longitude, action)=>{
    const response = await fetch(`${API_URL}/api/checkin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId,
            locationId,
            userLatitude: latitude,
            userLongitude: longitude,
            action
        })
    });
    return response.json();
};
}),
"[project]/GeoHere/src/components/CheckinForm.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CheckinForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GeoHere/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GeoHere/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GeoHere/src/lib/api.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function CheckinForm() {
    const [username, setUsername] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [locations, setLocations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedLocation, setSelectedLocation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [isLoggedIn, setIsLoggedIn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [messageType, setMessageType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [userLocation, setUserLocation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("dark");
    const [locationError, setLocationError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [userId, setUserId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [lastAction, setLastAction] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const fetchLocations = async ()=>{
            try {
                const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getLocations"])();
                if (response.success) {
                    setLocations(response.locations);
                }
            } catch (error) {
                console.error("Error al obtener ubicaciones:", error);
            }
        };
        fetchLocations();
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const storedTheme = localStorage.getItem("theme") || "dark";
        setTheme(storedTheme);
        document.body.dataset.theme = storedTheme;
        document.body.classList.toggle("dark", storedTheme === "dark");
    }, []);
    const toggleTheme = ()=>{
        const next = theme === "dark" ? "light" : "dark";
        setTheme(next);
        localStorage.setItem("theme", next);
        document.body.dataset.theme = next;
        document.body.classList.toggle("dark", next === "dark");
    };
    const getUserLocation = async ()=>{
        setLocationError("");
        if (!navigator.geolocation) {
            setLocationError("Geolocalización no disponible en tu navegador");
            return;
        }
        try {
            const position = await new Promise((resolve, reject)=>{
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                });
            });
            setUserLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude
            });
            setLocationError("");
        } catch (error) {
            setLocationError("No pudimos acceder a tu ubicación. Asegúrate de haber dado permisos.");
            console.error("Error de geolocalización:", error);
        }
    };
    const handleLogin = async (e)=>{
        e.preventDefault();
        setIsLoading(true);
        setMessage("");
        try {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["login"])(username, password);
            if (response.success && response.user) {
                setIsLoggedIn(true);
                setUserId(response.user.id);
                setMessage("Iniciaste sesión correctamente");
                setMessageType("success");
                setTimeout(()=>setMessage(""), 3000);
            } else {
                setMessage(response.message || "Error en las credenciales");
                setMessageType("error");
            }
        } catch (error) {
            setMessage("Error de conexión con el servidor");
            setMessageType("error");
        } finally{
            setIsLoading(false);
        }
    };
    const handleCheckin = async (action)=>{
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
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["checkin"])(userId, selectedLocation, userLocation.lat, userLocation.lng, action);
            if (response.success) {
                setMessage(response.message);
                setMessageType("success");
                setLastAction(`${action === "checkin" ? "Llegada" : "Salida"} a ${response.location}`);
                setTimeout(()=>setMessage(""), 5000);
            } else {
                setMessage(response.message);
                setMessageType("error");
            }
        } catch (error) {
            setMessage("Error al procesar la solicitud");
            setMessageType("error");
        } finally{
            setIsLoading(false);
        }
    };
    if (!isLoggedIn) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "login-container rounded-lg p-10 space-y-6",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between items-center mb-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-2xl font-light tracking-wide",
                            style: {
                                color: "var(--login-text)"
                            },
                            children: "GeoHere"
                        }, void 0, false, {
                            fileName: "[project]/GeoHere/src/components/CheckinForm.tsx",
                            lineNumber: 157,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: toggleTheme,
                            className: "px-4 py-2 border transition btn-minimal-outline",
                            style: {
                                borderColor: "var(--login-border)",
                                color: "var(--login-text)"
                            },
                            children: theme === "dark" ? "☀️ Claro" : "🌙 Oscuro"
                        }, void 0, false, {
                            fileName: "[project]/GeoHere/src/components/CheckinForm.tsx",
                            lineNumber: 163,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/GeoHere/src/components/CheckinForm.tsx",
                    lineNumber: 156,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleLogin,
                    className: "space-y-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "login-label block mb-2",
                                    children: "RUT o Nombre"
                                }, void 0, false, {
                                    fileName: "[project]/GeoHere/src/components/CheckinForm.tsx",
                                    lineNumber: 178,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    value: username,
                                    onChange: (e)=>setUsername(e.target.value),
                                    placeholder: "12.345.678-9 o Juan Pérez",
                                    className: "login-input w-full px-3 py-2 rounded-md text-sm",
                                    disabled: isLoading
                                }, void 0, false, {
                                    fileName: "[project]/GeoHere/src/components/CheckinForm.tsx",
                                    lineNumber: 179,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/GeoHere/src/components/CheckinForm.tsx",
                            lineNumber: 177,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "login-label block mb-2",
                                    children: "Contraseña"
                                }, void 0, false, {
                                    fileName: "[project]/GeoHere/src/components/CheckinForm.tsx",
                                    lineNumber: 190,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "password",
                                    value: password,
                                    onChange: (e)=>setPassword(e.target.value),
                                    placeholder: "Ingresa tu contraseña",
                                    className: "login-input w-full px-3 py-2 rounded-md text-sm",
                                    disabled: isLoading
                                }, void 0, false, {
                                    fileName: "[project]/GeoHere/src/components/CheckinForm.tsx",
                                    lineNumber: 191,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/GeoHere/src/components/CheckinForm.tsx",
                            lineNumber: 189,
                            columnNumber: 11
                        }, this),
                        message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `p-3 rounded-md text-sm font-medium ${messageType === "success" ? "bg-emerald-100 text-emerald-900" : "bg-rose-100 text-rose-900"}`,
                            children: message
                        }, void 0, false, {
                            fileName: "[project]/GeoHere/src/components/CheckinForm.tsx",
                            lineNumber: 202,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "submit",
                            disabled: isLoading,
                            className: "login-btn w-full py-2 px-4 rounded-md text-sm disabled:opacity-50",
                            children: isLoading ? "Cargando..." : "Iniciar Sesión"
                        }, void 0, false, {
                            fileName: "[project]/GeoHere/src/components/CheckinForm.tsx",
                            lineNumber: 209,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/GeoHere/src/components/CheckinForm.tsx",
                    lineNumber: 176,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/GeoHere/src/components/CheckinForm.tsx",
            lineNumber: 155,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "card-minimal w-full max-w-md space-y-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex justify-between items-center mb-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-xl font-light tracking-wide",
                        style: {
                            color: "var(--login-text)"
                        },
                        children: "Check-in"
                    }, void 0, false, {
                        fileName: "[project]/GeoHere/src/components/CheckinForm.tsx",
                        lineNumber: 224,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: toggleTheme,
                        className: "px-4 py-2 border transition btn-minimal-outline",
                        style: {
                            borderColor: "var(--login-border)",
                            color: "var(--login-text)"
                        },
                        children: theme === "dark" ? "☀️ Claro" : "🌙 Oscuro"
                    }, void 0, false, {
                        fileName: "[project]/GeoHere/src/components/CheckinForm.tsx",
                        lineNumber: 230,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/GeoHere/src/components/CheckinForm.tsx",
                lineNumber: 223,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "login-label block mb-2",
                        children: "Ubicación"
                    }, void 0, false, {
                        fileName: "[project]/GeoHere/src/components/CheckinForm.tsx",
                        lineNumber: 244,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: selectedLocation,
                        onChange: (e)=>setSelectedLocation(e.target.value),
                        className: "input-minimal w-full",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "-- Selecciona una ubicación --"
                            }, void 0, false, {
                                fileName: "[project]/GeoHere/src/components/CheckinForm.tsx",
                                lineNumber: 250,
                                columnNumber: 11
                            }, this),
                            locations.map((loc)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: loc.id,
                                    children: loc.name
                                }, loc.id, false, {
                                    fileName: "[project]/GeoHere/src/components/CheckinForm.tsx",
                                    lineNumber: 252,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/GeoHere/src/components/CheckinForm.tsx",
                        lineNumber: 245,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/GeoHere/src/components/CheckinForm.tsx",
                lineNumber: 243,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: getUserLocation,
                        disabled: isLoading,
                        className: "btn-minimal w-full disabled:opacity-50",
                        children: [
                            "📍 ",
                            userLocation ? "Actualizar ubicación" : "Obtener ubicación"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/GeoHere/src/components/CheckinForm.tsx",
                        lineNumber: 260,
                        columnNumber: 9
                    }, this),
                    userLocation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs opacity-60 text-center",
                        children: [
                            "Lat: ",
                            userLocation.lat.toFixed(4),
                            ", Lng:",
                            " ",
                            userLocation.lng.toFixed(4)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/GeoHere/src/components/CheckinForm.tsx",
                        lineNumber: 269,
                        columnNumber: 11
                    }, this),
                    locationError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-red-600 dark:text-red-400 text-center",
                        children: locationError
                    }, void 0, false, {
                        fileName: "[project]/GeoHere/src/components/CheckinForm.tsx",
                        lineNumber: 275,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/GeoHere/src/components/CheckinForm.tsx",
                lineNumber: 259,
                columnNumber: 7
            }, this),
            message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-3 rounded-md text-sm font-medium text-center border ${messageType === 'success' ? 'border-green-500 bg-green-50 text-green-900 dark:bg-green-900/20 dark:text-green-100' : 'border-red-500 bg-red-50 text-red-900 dark:bg-red-900/20 dark:text-red-100'}",
                children: message
            }, void 0, false, {
                fileName: "[project]/GeoHere/src/components/CheckinForm.tsx",
                lineNumber: 282,
                columnNumber: 9
            }, this),
            lastAction && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-3 rounded-md text-sm font-medium text-center border border-current opacity-70",
                children: [
                    "✓ ",
                    lastAction
                ]
            }, void 0, true, {
                fileName: "[project]/GeoHere/src/components/CheckinForm.tsx",
                lineNumber: 288,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>handleCheckin("checkin"),
                        disabled: isLoading || !userLocation || !selectedLocation,
                        className: "btn-minimal disabled:opacity-50",
                        children: "✓ Llegué"
                    }, void 0, false, {
                        fileName: "[project]/GeoHere/src/components/CheckinForm.tsx",
                        lineNumber: 294,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>handleCheckin("checkout"),
                        disabled: isLoading || !userLocation || !selectedLocation,
                        className: "btn-minimal disabled:opacity-50",
                        children: "✕ Me Voy"
                    }, void 0, false, {
                        fileName: "[project]/GeoHere/src/components/CheckinForm.tsx",
                        lineNumber: 301,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/GeoHere/src/components/CheckinForm.tsx",
                lineNumber: 293,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>{
                    setIsLoggedIn(false);
                    setUsername("");
                    setPassword("");
                    setMessage("");
                },
                className: "btn-minimal-outline w-full",
                children: "Cerrar sesión"
            }, void 0, false, {
                fileName: "[project]/GeoHere/src/components/CheckinForm.tsx",
                lineNumber: 310,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/GeoHere/src/components/CheckinForm.tsx",
        lineNumber: 222,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1b10fe36._.js.map