module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

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
"[project]/GeoHere/src/app/admin/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GeoHere/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GeoHere/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GeoHere/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/GeoHere/src/lib/api.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function AdminPanel() {
    const [showRegisterForm, setShowRegisterForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [rut, setRut] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [messageType, setMessageType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [showLocations, setShowLocations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [locations, setLocations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showAddLocation, setShowAddLocation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [newLocationName, setNewLocationName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [newLocationLat, setNewLocationLat] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [newLocationLng, setNewLocationLng] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [editingLocation, setEditingLocation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editName, setEditName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [editLat, setEditLat] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [editLng, setEditLng] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [showUsers, setShowUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [users, setUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [registeredUser, setRegisteredUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [company, setCompany] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [theme, setTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("dark");
    const [compactMode, setCompactMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [editingUserId, setEditingUserId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editUserName, setEditUserName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [editUserRut, setEditUserRut] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const companyToken = localStorage.getItem("companyToken");
        const companyData = localStorage.getItem("company");
        if (!companyToken || !companyData) {
            router.push("/company-login");
            return;
        }
        setCompany(JSON.parse(companyData));
    }, [
        router
    ]);
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
    const handleShowLocations = async ()=>{
        try {
            const response = await fetch("http://localhost:3001/api/locations");
            const data = await response.json();
            if (data.success) {
                setLocations(data.locations);
                setShowLocations(true);
            }
        } catch (error) {
            console.error("Error al obtener ubicaciones:", error);
        }
    };
    const handleShowUsers = async ()=>{
        try {
            const response = await fetch("http://localhost:3001/api/users");
            const data = await response.json();
            if (data.success) {
                setUsers(data.users);
                setShowUsers(true);
            }
        } catch (error) {
            console.error("Error al obtener usuarios:", error);
        }
    };
    const handleDeleteUser = async (userId, username)=>{
        if (!confirm(`¿Eliminar usuario ${username}?`)) {
            return;
        }
        try {
            const response = await fetch(`http://localhost:3001/api/users/${userId}`, {
                method: "DELETE"
            });
            const data = await response.json();
            if (data.success) {
                await handleShowUsers();
                setMessage("Usuario eliminado exitosamente");
                setMessageType("success");
                setTimeout(()=>setMessage(""), 3000);
            } else {
                alert("Error al eliminar usuario: " + data.message);
            }
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
            alert("Error de conexión");
        }
    };
    const handleNewPassword = async (userId, username)=>{
        try {
            const response = await fetch(`http://localhost:3001/api/users/${userId}/new-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            if (data.success) {
                setRegisteredUser({
                    name: username,
                    rut: username,
                    password: data.password
                });
                setMessage("Nueva contraseña generada");
                setMessageType("success");
                setTimeout(()=>{
                    setMessage("");
                    setRegisteredUser(null);
                }, 5000);
            } else {
                alert("Error: " + data.message);
            }
        } catch (error) {
            console.error("Error al generar contraseña:", error);
            alert("Error de conexión");
        }
    };
    const handleEditUser = (user)=>{
        setEditingUserId(user.id);
        setEditUserRut(user.username);
        setEditUserName(user.name || user.username);
    };
    const handleSaveUserEdit = async ()=>{
        if (!editingUserId || !editUserRut || !editUserName) {
            alert("RUT y nombre son requeridos");
            return;
        }
        try {
            const response = await fetch(`http://localhost:3001/api/users/${editingUserId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: editUserRut,
                    name: editUserName
                })
            });
            const data = await response.json();
            if (data.success) {
                await handleShowUsers();
                setEditingUserId(null);
                setEditUserRut("");
                setEditUserName("");
                setMessage("Usuario actualizado correctamente");
                setMessageType("success");
                setTimeout(()=>setMessage(""), 3000);
            } else {
                alert("Error: " + data.message);
            }
        } catch (error) {
            console.error("Error al editar usuario:", error);
            alert("Error de conexión");
        }
    };
    const handleAddLocation = async (e)=>{
        e.preventDefault();
        const lat = parseFloat(newLocationLat);
        const lng = parseFloat(newLocationLng);
        if (!newLocationName || isNaN(lat) || isNaN(lng)) {
            alert("Por favor, ingresa un nombre válido y coordenadas numéricas");
            return;
        }
        try {
            const response = await fetch("http://localhost:3001/api/locations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: newLocationName,
                    latitude: lat,
                    longitude: lng,
                    radius: 50
                })
            });
            const data = await response.json();
            if (data.success) {
                await handleShowLocations();
                setNewLocationName("");
                setNewLocationLat("");
                setNewLocationLng("");
                setShowAddLocation(false);
            } else {
                alert("Error al añadir ubicación: " + data.message);
            }
        } catch (error) {
            console.error("Error al añadir ubicación:", error);
            alert("Error de conexión");
        }
    };
    const handleEditLocation = (location)=>{
        setEditingLocation(location);
        setEditName(location.name);
        setEditLat(location.latitude.toString());
        setEditLng(location.longitude.toString());
    };
    const handleSaveEdit = async ()=>{
        const lat = parseFloat(editLat);
        const lng = parseFloat(editLng);
        if (!editName || isNaN(lat) || isNaN(lng)) {
            alert("Por favor, ingresa un nombre válido y coordenadas numéricas");
            return;
        }
        try {
            const response = await fetch(`http://localhost:3001/api/locations/${editingLocation.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: editName,
                    latitude: lat,
                    longitude: lng,
                    radius: 50
                })
            });
            const data = await response.json();
            if (data.success) {
                await handleShowLocations();
                setEditingLocation(null);
                setEditName("");
                setEditLat("");
                setEditLng("");
            } else {
                alert("Error al editar ubicación: " + data.message);
            }
        } catch (error) {
            console.error("Error al editar ubicación:", error);
            alert("Error de conexión");
        }
    };
    const handleDeleteLocation = async (locationId)=>{
        if (!confirm("¿Estás seguro de que quieres eliminar esta ubicación?")) {
            return;
        }
        try {
            const response = await fetch(`http://localhost:3001/api/locations/${locationId}`, {
                method: "DELETE"
            });
            const data = await response.json();
            if (data.success) {
                await handleShowLocations();
            } else {
                alert("Error al eliminar ubicación: " + data.message);
            }
        } catch (error) {
            console.error("Error al eliminar ubicación:", error);
            alert("Error de conexión");
        }
    };
    const handleRegister = async (e)=>{
        e.preventDefault();
        setIsLoading(true);
        setMessage("");
        try {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["register"])(name, rut);
            if (response.success && response.user) {
                setRegisteredUser({
                    name: response.user.name,
                    rut: response.user.rut,
                    password: response.user.password
                });
                setMessage("Usuario registrado exitosamente");
                setMessageType("success");
                setName("");
                setRut("");
                setTimeout(()=>setMessage(""), 5000);
            } else {
                setMessage(response.message || "Error al registrar usuario");
                setMessageType("error");
            }
        } catch (error) {
            setMessage("Error de conexión con el servidor");
            setMessageType("error");
        } finally{
            setIsLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen p-4 md:p-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: toggleTheme,
                className: "absolute top-6 right-6 text-sm px-3 py-1 border-b transition",
                style: {
                    borderColor: "var(--login-border)",
                    color: "var(--login-text)"
                },
                children: theme === "dark" ? "☀️" : "🌙"
            }, void 0, false, {
                fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                lineNumber: 340,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-4xl mx-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-3xl font-light tracking-wide mb-1",
                                style: {
                                    color: "var(--login-text)"
                                },
                                children: "Panel de Administración"
                            }, void 0, false, {
                                fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                lineNumber: 353,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm opacity-60",
                                children: "Casona Nueva"
                            }, void 0, false, {
                                fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                lineNumber: 356,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                        lineNumber: 352,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-3 gap-3 mb-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleShowLocations,
                                className: "btn-minimal",
                                children: "🌿 Ubicaciones"
                            }, void 0, false, {
                                fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                lineNumber: 360,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleShowUsers,
                                className: "btn-minimal",
                                children: "👥 Usuarios"
                            }, void 0, false, {
                                fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                lineNumber: 366,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setCompactMode(!compactMode),
                                className: "btn-minimal-outline",
                                children: compactMode ? "Extendido" : "Compacto"
                            }, void 0, false, {
                                fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                lineNumber: 372,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                        lineNumber: 359,
                        columnNumber: 9
                    }, this),
                    message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card-minimal mb-4 text-sm border-t-2",
                        style: {
                            borderTopColor: messageType === "success" ? "#16a34a" : "#dc2626"
                        },
                        children: message
                    }, void 0, false, {
                        fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                        lineNumber: 381,
                        columnNumber: 11
                    }, this),
                    showLocations && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "card-minimal mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-lg font-semibold",
                                        children: "Ubicaciones"
                                    }, void 0, false, {
                                        fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                        lineNumber: 391,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowAddLocation(!showAddLocation),
                                        className: "btn-minimal-outline text-sm",
                                        children: showAddLocation ? "Cancelar" : "Agregar"
                                    }, void 0, false, {
                                        fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                        lineNumber: 392,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                lineNumber: 390,
                                columnNumber: 13
                            }, this),
                            showAddLocation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                onSubmit: handleAddLocation,
                                className: "space-y-3 mb-4 pb-4 border-b",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: newLocationName,
                                        onChange: (e)=>setNewLocationName(e.target.value),
                                        placeholder: "Nombre",
                                        className: "input-minimal w-full",
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                        lineNumber: 402,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                step: "any",
                                                value: newLocationLat,
                                                onChange: (e)=>setNewLocationLat(e.target.value),
                                                placeholder: "Latitud",
                                                className: "input-minimal",
                                                required: true
                                            }, void 0, false, {
                                                fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                                lineNumber: 411,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                step: "any",
                                                value: newLocationLng,
                                                onChange: (e)=>setNewLocationLng(e.target.value),
                                                placeholder: "Longitud",
                                                className: "input-minimal",
                                                required: true
                                            }, void 0, false, {
                                                fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                                lineNumber: 420,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                        lineNumber: 410,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        className: "btn-minimal w-full",
                                        children: "Guardar"
                                    }, void 0, false, {
                                        fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                        lineNumber: 430,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                lineNumber: 401,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: locations.map((loc)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "border-b pb-3",
                                        children: editingLocation?.id === loc.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    value: editName,
                                                    onChange: (e)=>setEditName(e.target.value),
                                                    placeholder: "Nombre",
                                                    className: "input-minimal w-full"
                                                }, void 0, false, {
                                                    fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                                    lineNumber: 441,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "grid grid-cols-2 gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "number",
                                                            step: "any",
                                                            value: editLat,
                                                            onChange: (e)=>setEditLat(e.target.value),
                                                            placeholder: "Latitud",
                                                            className: "input-minimal"
                                                        }, void 0, false, {
                                                            fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                                            lineNumber: 449,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                            type: "number",
                                                            step: "any",
                                                            value: editLng,
                                                            onChange: (e)=>setEditLng(e.target.value),
                                                            placeholder: "Longitud",
                                                            className: "input-minimal"
                                                        }, void 0, false, {
                                                            fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                                            lineNumber: 457,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                                    lineNumber: 448,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: handleSaveEdit,
                                                            className: "btn-minimal flex-1 text-sm",
                                                            children: "Guardar"
                                                        }, void 0, false, {
                                                            fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                                            lineNumber: 467,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setEditingLocation(null),
                                                            className: "btn-minimal-outline flex-1 text-sm",
                                                            children: "Cancelar"
                                                        }, void 0, false, {
                                                            fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                                            lineNumber: 470,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                                    lineNumber: 466,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                            lineNumber: 440,
                                            columnNumber: 21
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-start",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "font-medium",
                                                            children: loc.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                                            lineNumber: 478,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs opacity-60 mt-1",
                                                            children: [
                                                                loc.latitude.toFixed(4),
                                                                ", ",
                                                                loc.longitude.toFixed(4)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                                            lineNumber: 479,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                                    lineNumber: 477,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>handleEditLocation(loc),
                                                            className: "btn-minimal-outline text-xs px-2 py-1",
                                                            children: "✎"
                                                        }, void 0, false, {
                                                            fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                                            lineNumber: 484,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>handleDeleteLocation(loc.id),
                                                            className: "btn-minimal-danger text-xs px-2 py-1",
                                                            children: "🗑"
                                                        }, void 0, false, {
                                                            fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                                            lineNumber: 490,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                                    lineNumber: 483,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                            lineNumber: 476,
                                            columnNumber: 21
                                        }, this)
                                    }, loc.id, false, {
                                        fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                        lineNumber: 438,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                lineNumber: 436,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowLocations(false),
                                className: "btn-minimal-outline w-full mt-4 text-sm",
                                children: "Cerrar"
                            }, void 0, false, {
                                fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                lineNumber: 503,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                        lineNumber: 389,
                        columnNumber: 11
                    }, this),
                    showUsers && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "bg-slate-950/50 border border-white/20 rounded-2xl p-5 mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap items-center justify-between gap-3 mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-xl font-semibold text-white",
                                        children: "Usuarios"
                                    }, void 0, false, {
                                        fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                        lineNumber: 515,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setShowRegisterForm(!showRegisterForm),
                                        className: "btn-modern btn-leaf",
                                        children: showRegisterForm ? "Cancelar" : "➕ Añadir usuario"
                                    }, void 0, false, {
                                        fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                        lineNumber: 516,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                lineNumber: 514,
                                columnNumber: 13
                            }, this),
                            showRegisterForm && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                onSubmit: handleRegister,
                                className: "grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900/60 border border-white/15 rounded-xl p-4 mb-5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: name,
                                        onChange: (e)=>setName(e.target.value),
                                        placeholder: "Nombre",
                                        className: "rounded-xl bg-white/10 border border-white/20 px-3 py-2 text-white focus:outline-none focus:border-sky-300",
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                        lineNumber: 529,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        value: rut,
                                        onChange: (e)=>setRut(e.target.value),
                                        placeholder: "RUT",
                                        className: "rounded-xl bg-white/10 border border-white/20 px-3 py-2 text-white focus:outline-none focus:border-sky-300",
                                        required: true
                                    }, void 0, false, {
                                        fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                        lineNumber: 537,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        disabled: isLoading,
                                        className: "btn-modern btn-leaf col-span-1 md:col-span-1",
                                        children: "Registrar"
                                    }, void 0, false, {
                                        fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                        lineNumber: 545,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>setShowRegisterForm(false),
                                        className: "btn-modern btn-outline col-span-1 md:col-span-1",
                                        children: "Cancelar"
                                    }, void 0, false, {
                                        fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                        lineNumber: 552,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                lineNumber: 525,
                                columnNumber: 15
                            }, this),
                            message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `mb-4 p-3 rounded-lg ${messageType === "success" ? "bg-emerald-100 text-emerald-900" : "bg-rose-100 text-rose-900"}`,
                                children: message
                            }, void 0, false, {
                                fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                lineNumber: 563,
                                columnNumber: 15
                            }, this),
                            registeredUser && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-4 p-4 bg-sky-950/40 border border-sky-300/20 rounded-lg text-sky-100",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "font-semibold text-sky-200 mb-2",
                                        children: "Usuario Registrado"
                                    }, void 0, false, {
                                        fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                        lineNumber: 572,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "Nombre:"
                                            }, void 0, false, {
                                                fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                                lineNumber: 576,
                                                columnNumber: 19
                                            }, this),
                                            " ",
                                            registeredUser.name
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                        lineNumber: 575,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "RUT:"
                                            }, void 0, false, {
                                                fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                                lineNumber: 579,
                                                columnNumber: 19
                                            }, this),
                                            " ",
                                            registeredUser.rut
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                        lineNumber: 578,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "Contraseña:"
                                            }, void 0, false, {
                                                fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                                lineNumber: 582,
                                                columnNumber: 19
                                            }, this),
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono bg-sky-900/70 px-2 py-1 rounded",
                                                children: registeredUser.password
                                            }, void 0, false, {
                                                fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                                lineNumber: 583,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                        lineNumber: 581,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-slate-300 mt-2",
                                        children: "⚠️ Guarda esta contraseña en un lugar seguro."
                                    }, void 0, false, {
                                        fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                        lineNumber: 587,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                lineNumber: 571,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: users.map((user)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                        className: "bg-slate-900/40 border border-white/10 rounded-lg p-4 flex items-center justify-between gap-3",
                                        children: editingUserId === user.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-wrap gap-2 w-full items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    value: editUserName,
                                                    onChange: (e)=>setEditUserName(e.target.value),
                                                    placeholder: "Nombre",
                                                    className: "flex-1 min-w-[180px] rounded-lg bg-slate-800/70 border border-white/20 px-2 py-1 text-white"
                                                }, void 0, false, {
                                                    fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                                    lineNumber: 601,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    value: editUserRut,
                                                    onChange: (e)=>setEditUserRut(e.target.value),
                                                    placeholder: "RUT",
                                                    className: "flex-1 min-w-[180px] rounded-lg bg-slate-800/70 border border-white/20 px-2 py-1 text-white"
                                                }, void 0, false, {
                                                    fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                                    lineNumber: 608,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: handleSaveUserEdit,
                                                    className: "btn-modern btn-primary w-fit",
                                                    children: "Guardar"
                                                }, void 0, false, {
                                                    fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                                    lineNumber: 615,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setEditingUserId(null),
                                                    className: "btn-modern btn-muted w-fit",
                                                    children: "Cancelar"
                                                }, void 0, false, {
                                                    fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                                    lineNumber: 621,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                            lineNumber: 600,
                                            columnNumber: 21
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "min-w-0 flex-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-white font-medium",
                                                            children: compactMode ? user.username : user.name || user.username
                                                        }, void 0, false, {
                                                            fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                                            lineNumber: 631,
                                                            columnNumber: 25
                                                        }, this),
                                                        !compactMode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-slate-300 text-sm",
                                                            children: [
                                                                "RUT: ",
                                                                user.username
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                                            lineNumber: 635,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                                    lineNumber: 630,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex gap-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>handleEditUser(user),
                                                            className: "btn-modern btn-outline text-xs px-2 py-1",
                                                            title: "Editar usuario",
                                                            children: "✎"
                                                        }, void 0, false, {
                                                            fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                                            lineNumber: 639,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>handleNewPassword(user.id, user.username),
                                                            className: "btn-modern btn-outline text-xs px-2 py-1",
                                                            title: "Generar nueva contraseña",
                                                            children: "🔑"
                                                        }, void 0, false, {
                                                            fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                                            lineNumber: 646,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>handleDeleteUser(user.id, user.username),
                                                            className: "btn-modern btn-danger text-xs px-2 py-1",
                                                            title: "Eliminar usuario",
                                                            children: "🗑"
                                                        }, void 0, false, {
                                                            fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                                            lineNumber: 653,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                                    lineNumber: 638,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true)
                                    }, user.id, false, {
                                        fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                        lineNumber: 595,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                lineNumber: 593,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowUsers(false),
                                className: "btn-modern btn-muted w-full mt-4",
                                children: "Cerrar"
                            }, void 0, false, {
                                fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                lineNumber: 667,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                        lineNumber: 513,
                        columnNumber: 11
                    }, this),
                    showRegisterForm && !showUsers && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "bg-slate-950/50 border border-white/20 rounded-2xl p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-xl font-semibold text-white mb-3",
                                children: "Registrar Nuevo Usuario"
                            }, void 0, false, {
                                fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                lineNumber: 678,
                                columnNumber: 13
                            }, this),
                            message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `mb-4 p-3 rounded-lg ${messageType === "success" ? "bg-emerald-100 text-emerald-900" : "bg-rose-100 text-rose-900"}`,
                                children: message
                            }, void 0, false, {
                                fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                lineNumber: 683,
                                columnNumber: 15
                            }, this),
                            registeredUser && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-4 p-4 bg-sky-950/40 border border-sky-300/20 rounded-lg text-sky-100",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                        className: "font-semibold text-sky-200 mb-2",
                                        children: "Usuario Registrado"
                                    }, void 0, false, {
                                        fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                        lineNumber: 692,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "Nombre:"
                                            }, void 0, false, {
                                                fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                                lineNumber: 696,
                                                columnNumber: 19
                                            }, this),
                                            " ",
                                            registeredUser.name
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                        lineNumber: 695,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "RUT:"
                                            }, void 0, false, {
                                                fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                                lineNumber: 699,
                                                columnNumber: 19
                                            }, this),
                                            " ",
                                            registeredUser.rut
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                        lineNumber: 698,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "Contraseña:"
                                            }, void 0, false, {
                                                fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                                lineNumber: 702,
                                                columnNumber: 19
                                            }, this),
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "font-mono bg-sky-900/70 px-2 py-1 rounded",
                                                children: registeredUser.password
                                            }, void 0, false, {
                                                fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                                lineNumber: 703,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                        lineNumber: 701,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-slate-300 mt-2",
                                        children: "⚠️ Guarda esta contraseña en un lugar seguro. No se puede recuperar."
                                    }, void 0, false, {
                                        fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                        lineNumber: 707,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                lineNumber: 691,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                onSubmit: handleRegister,
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs uppercase tracking-widest text-slate-400 mb-1",
                                                children: "Nombre Completo"
                                            }, void 0, false, {
                                                fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                                lineNumber: 716,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: name,
                                                onChange: (e)=>setName(e.target.value),
                                                placeholder: "Ej: Juan Pérez",
                                                className: "w-full rounded-xl bg-white/10 border border-white/20 px-3 py-2 text-white",
                                                required: true
                                            }, void 0, false, {
                                                fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                                lineNumber: 719,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                        lineNumber: 715,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs uppercase tracking-widest text-slate-400 mb-1",
                                                children: "RUT"
                                            }, void 0, false, {
                                                fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                                lineNumber: 730,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                value: rut,
                                                onChange: (e)=>setRut(e.target.value),
                                                placeholder: "Ej: 12345678-9",
                                                className: "w-full rounded-xl bg-white/10 border border-white/20 px-3 py-2 text-white",
                                                required: true
                                            }, void 0, false, {
                                                fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                                lineNumber: 733,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                        lineNumber: 729,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$GeoHere$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        disabled: isLoading,
                                        className: "btn-modern btn-primary w-full disabled:opacity-70",
                                        children: isLoading ? "Registrando..." : "Registrar Usuario"
                                    }, void 0, false, {
                                        fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                        lineNumber: 743,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                                lineNumber: 714,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                        lineNumber: 677,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/GeoHere/src/app/admin/page.tsx",
                lineNumber: 351,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/GeoHere/src/app/admin/page.tsx",
        lineNumber: 339,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__b5b9e0f7._.js.map