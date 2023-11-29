exports.id = 507;
exports.ids = [507];
exports.modules = {

/***/ 4174:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 5162));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 3570));
Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 8885))

/***/ }),

/***/ 5162:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Navbar: () => (/* binding */ Navbar)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(6786);
// EXTERNAL MODULE: ./src/svgs/profilecircle.tsx
var profilecircle = __webpack_require__(9110);
// EXTERNAL MODULE: external "next/dist/compiled/react"
var react_ = __webpack_require__(8038);
// EXTERNAL MODULE: ./src/services/axiosconfig.tsx
var axiosconfig = __webpack_require__(7649);
;// CONCATENATED MODULE: ./src/svgs/show-hide-eyes.tsx

const ShowPassSvg = ()=>{
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "pointer-events-none",
        children: /*#__PURE__*/ jsx_runtime_.jsx("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: 22,
            height: 22,
            fill: "none",
            viewBox: "0 0 20 20",
            className: "pointer-events-none",
            children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                fill: "#000",
                fillRule: "evenodd",
                d: "M3.415 10.242c-.067-.086-.13-.167-.186-.242a16.806 16.806 0 0 1 1.803-2.025C6.429 6.648 8.187 5.5 10 5.5c1.813 0 3.57 1.148 4.968 2.475A16.816 16.816 0 0 1 16.771 10a16.9 16.9 0 0 1-1.803 2.025C13.57 13.352 11.813 14.5 10 14.5c-1.813 0-3.57-1.148-4.968-2.475a16.799 16.799 0 0 1-1.617-1.783zm15.423-.788L18 10l.838.546-.002.003-.003.004-.01.016-.037.054a17.123 17.123 0 0 1-.628.854 18.805 18.805 0 0 1-1.812 1.998C14.848 14.898 12.606 16.5 10 16.5s-4.848-1.602-6.346-3.025a18.806 18.806 0 0 1-2.44-2.852 6.01 6.01 0 0 1-.037-.054l-.01-.016-.003-.004-.001-.002c0-.001-.001-.001.837-.547l-.838-.546.002-.003.003-.004.01-.016a6.84 6.84 0 0 1 .17-.245 18.804 18.804 0 0 1 2.308-2.66C5.151 5.1 7.394 3.499 10 3.499s4.848 1.602 6.346 3.025a18.803 18.803 0 0 1 2.44 2.852l.037.054.01.016.003.004.001.002zM18 10l.838-.546.355.546-.355.546L18 10zM1.162 9.454 2 10l-.838.546L.807 10l.355-.546zM9 10a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm1-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"
            })
        })
    });
};
const HidePassSvg = ()=>{
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "pointer-events-none",
        children: /*#__PURE__*/ jsx_runtime_.jsx("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: 22,
            height: 22,
            fill: "none",
            viewBox: "0 0 24 24",
            children: /*#__PURE__*/ jsx_runtime_.jsx("path", {
                fill: "#000",
                d: "M19.707 5.707a1 1 0 0 0-1.414-1.414l-4.261 4.26a4 4 0 0 0-5.478 5.478l-4.261 4.262a1 1 0 1 0 1.414 1.414l4.261-4.26a4 4 0 0 0 5.478-5.478l4.261-4.262Zm-7.189 4.36a2 2 0 0 0-2.45 2.45l2.45-2.45Zm-1.036 3.865 2.45-2.45a2 2 0 0 1-2.45 2.45Zm4.283-9.111C14.63 4.32 13.367 4 12 4 9.148 4 6.757 5.395 4.998 6.906c-1.765 1.517-2.99 3.232-3.534 4.064a1.876 1.876 0 0 0 0 2.06 20.304 20.304 0 0 0 2.748 3.344l1.414-1.414A18.315 18.315 0 0 1 3.18 12c.51-.773 1.598-2.268 3.121-3.577C7.874 7.072 9.816 6 12 6a7.06 7.06 0 0 1 2.22.367l1.545-1.546ZM12 18a7.06 7.06 0 0 1-2.22-.367L8.236 19.18c1.136.5 2.398.821 3.765.821 2.852 0 5.243-1.395 7.002-2.906 1.765-1.517 2.99-3.232 3.534-4.064.411-.628.411-1.431 0-2.06a20.303 20.303 0 0 0-2.748-3.344L18.374 9.04A18.312 18.312 0 0 1 20.82 12c-.51.773-1.598 2.268-3.121 3.577C16.126 16.928 14.184 18 12 18Z",
                clipRule: "evenodd"
            })
        })
    });
};

// EXTERNAL MODULE: ./src/services/GlobalContext.tsx
var GlobalContext = __webpack_require__(3570);
// EXTERNAL MODULE: ./node_modules/next/navigation.js
var navigation = __webpack_require__(9483);
;// CONCATENATED MODULE: ./src/components/LoginModal.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 






const LoginModal = ({ showLoginModal })=>{
    const [loginInput, setLoginInput] = (0,react_.useState)({
        email: "",
        password: ""
    });
    const globalState = (0,react_.useContext)(GlobalContext.GlobalContext);
    const [passwordViewState, setPasswordViewState] = (0,react_.useState)(false);
    const router = (0,navigation.useRouter)();
    const handleLoginInput = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setLoginInput((prev)=>{
            return {
                ...prev,
                [name]: value
            };
        });
    };
    const tryLogin = (e)=>{
        e.preventDefault();
        axiosconfig/* default */.Z.post("/login", loginInput).then((res)=>{
            globalState?.setToast({
                type: "success",
                message: res.data.msg
            });
            showLoginModal(false);
            router.replace("/");
        }).catch((err)=>{
            if (err.response) globalState?.setToast({
                type: "warning",
                message: err.response.data.msg
            });
        });
    };
    const handlePasswordView = ()=>{
        if (passwordViewState) {
            return setPasswordViewState(false);
        }
        setPasswordViewState(true);
    };
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "fixed  top-0 backdrop-blur-lg bg-white/20  h-screen w-full z-50",
        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: "relative w-full p-4 top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("form", {
                onSubmit: tryLogin,
                className: "my-form-modal flex flex-col gap-4  ",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "absolute  flex items-center justify-between left-0 top-0 bg-secondary w-full h-14 p-4  ",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "flex justify-center items-center font-sans  self-center  uppercase gap-1 text-white ",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "w-10 text-white p-2  rounded-sm",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(profilecircle/* ProfileSvg */.l, {})
                                    }),
                                    "LOGIN"
                                ]
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                type: "button",
                                onClick: ()=>{
                                    showLoginModal(false);
                                },
                                className: "self-start text-3xl font-bold leading-3 text-white ",
                                children: "X"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                        className: "label-input mt-14",
                        htmlFor: "email",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                name: "email",
                                onChange: handleLoginInput,
                                type: "text",
                                className: "my-input peer  ",
                                placeholder: "Email",
                                autoFocus: true
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                id: "email",
                                className: "span-input",
                                children: "Email"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                        htmlFor: "password",
                        className: "label-input relative",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                id: "password",
                                placeholder: "Senha",
                                type: passwordViewState ? "text" : "password",
                                name: "password",
                                onChange: handleLoginInput,
                                className: "my-input peer"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                id: "password",
                                className: "span-input",
                                children: "Senha"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                type: "button",
                                onClick: handlePasswordView,
                                className: "absolute right-2 top-[50%] -translate-y-[50%] ",
                                children: passwordViewState ? /*#__PURE__*/ jsx_runtime_.jsx(ShowPassSvg, {}) : /*#__PURE__*/ jsx_runtime_.jsx(HidePassSvg, {})
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                        onClick: tryLogin,
                        onKeyDown: (e)=>{
                            if (e.key === "Enter") tryLogin;
                        },
                        className: "my-btn w-full",
                        type: "submit",
                        children: "Entrar"
                    })
                ]
            })
        })
    });
};
/* harmony default export */ const components_LoginModal = (LoginModal);

// EXTERNAL MODULE: ./src/components/ValidationUserInput.tsx
var ValidationUserInput = __webpack_require__(1798);
;// CONCATENATED MODULE: ./src/components/RegisterModal.tsx







const RegisterModal = ({ showRegisterModal })=>{
    const globalState = (0,react_.useContext)(GlobalContext.GlobalContext);
    const [passwordViewState, setPasswordViewState] = (0,react_.useState)(false);
    const [userProfile, setUserProfile] = (0,react_.useState)("user");
    const [registerInput, setRegisterInput] = (0,react_.useState)({
        name: "",
        email: "",
        password: "",
        password_confirm: "",
        profile: userProfile
    });
    (0,react_.useEffect)(()=>{
        setRegisterInput((prev)=>{
            return {
                ...prev,
                profile: userProfile
            };
        });
    }, [
        userProfile
    ]);
    const handleRegisterInput = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setRegisterInput((prev)=>{
            return {
                ...prev,
                [name]: value
            };
        });
    };
    const tryRegister = (e)=>{
        e.preventDefault();
        const validation = (0,ValidationUserInput/* ValidateRegisterInput */.d)(registerInput);
        if (validation.valid === false) {
            return globalState?.setToast({
                type: "warning",
                message: validation.message
            });
        }
        axiosconfig/* default */.Z.post("/register", registerInput).then((res)=>{
            globalState?.setToast({
                type: "success",
                message: "Cadastro realizado com sucesso."
            });
            showRegisterModal(false);
        }).catch((err)=>{
            return globalState?.setToast({
                type: "error",
                message: err.response.data.msg
            });
        });
    };
    const handlePasswordView = ()=>{
        if (passwordViewState) {
            return setPasswordViewState(false);
        }
        setPasswordViewState(true);
    };
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "fixed  top-0 backdrop-blur-lg bg-white/20  h-screen w-full z-50",
        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: "relative w-full p-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("form", {
                onSubmit: tryRegister,
                className: "my-form-modal flex flex-col gap-4 z-30",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "absolute  flex items-center justify-between left-0 top-0 bg-secondary w-full h-14 p-4  ",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "flex justify-center items-center font-sans  self-center  uppercase gap-1 text-white ",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                        className: "w-10 text-white p-2  rounded-sm",
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(profilecircle/* ProfileSvg */.l, {})
                                    }),
                                    "CADASTRO"
                                ]
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                type: "button",
                                onClick: ()=>{
                                    showRegisterModal(false);
                                    globalState?.isDragDisabledSwitch(false);
                                },
                                className: "self-start text-3xl font-bold leading-3 text-white ",
                                children: "X"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                        htmlFor: "name",
                        className: "label-input mt-14",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                name: "name",
                                placeholder: "Nome",
                                onChange: handleRegisterInput,
                                type: "text",
                                className: " my-input peer ",
                                autoFocus: true
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                className: "span-input",
                                children: "Nome"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                        htmlFor: "email",
                        className: "label-input",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                name: "email",
                                placeholder: "Email",
                                onChange: handleRegisterInput,
                                type: "email",
                                className: " my-input peer"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                className: "span-input",
                                children: "Email"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                        htmlFor: "password",
                        className: "label-input relative",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                name: "password",
                                placeholder: "Senha",
                                onChange: handleRegisterInput,
                                type: passwordViewState ? "text" : "password",
                                className: " my-input peer"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                className: "span-input",
                                children: "Senha"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                type: "button",
                                onClick: handlePasswordView,
                                className: "absolute right-2 top-[50%] -translate-y-[50%] ",
                                children: passwordViewState ? /*#__PURE__*/ jsx_runtime_.jsx(ShowPassSvg, {}) : /*#__PURE__*/ jsx_runtime_.jsx(HidePassSvg, {})
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                        htmlFor: "password_confirm",
                        className: "label-input",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                name: "password_confirm",
                                placeholder: "Confirmar Senha",
                                onChange: handleRegisterInput,
                                type: "password",
                                className: " my-input peer"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                className: "span-input",
                                children: "Confirmar Senha"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "flex flex-col justify-evenly",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                className: "text-xs leading-4 text-secondary-focus mt-1",
                                children: "Selecione o tipo de conta.(Treinador pode enviar planilhas.)"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "flex",
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                                        className: "label gap-2 ",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                className: "checkbox focus:ring-transparent checkbox-secondary checkbox-sm rounded-sm",
                                                type: "checkbox",
                                                checked: userProfile === "user",
                                                onChange: ()=>setUserProfile("user"),
                                                onClick: ()=>setUserProfile("user")
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                className: "label-text text-xs",
                                                children: "Praticante"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                                        className: "label gap-2 ",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                className: "checkbox focus:ring-transparent checkbox-secondary checkbox-sm rounded-sm",
                                                type: "checkbox",
                                                checked: userProfile === "trainer",
                                                onChange: ()=>setUserProfile("trainer"),
                                                onClick: ()=>setUserProfile("trainer")
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                className: "label-text text-xs",
                                                children: "Treinador"
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                type: "submit",
                                className: "my-btn",
                                children: "Registrar"
                            })
                        ]
                    })
                ]
            })
        })
    });
};
/* harmony default export */ const components_RegisterModal = (RegisterModal);

;// CONCATENATED MODULE: ./src/svgs/fitAndApp-logo.tsx
/* __next_internal_client_entry_do_not_use__ default auto */ 

function FitAndAppLogo() {
    return /*#__PURE__*/ jsx_runtime_.jsx("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        version: "1.1",
        viewBox: "0 0 258 51.398",
        className: "w-56  ",
        preserveAspectRatio: "xMaxYMid meet",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("g", {
            transform: "translate(-28.604 -17.118)",
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("g", {
                    fillOpacity: "1",
                    strokeLinejoin: "bevel",
                    strokeOpacity: "1",
                    transform: "matrix(1.37779 0 0 .99578 -9.14 10.072)",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("g", {
                            fill: "#e24f00",
                            stroke: "#e24f00",
                            transform: "translate(-3.507 -8.39)",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                    strokeWidth: "1.499",
                                    d: "M129.136 16.215H133.349V66.332H129.136z"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                    strokeWidth: "1.347",
                                    d: "M135.297 21.669H139.646V60.879000000000005H135.297z"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                    strokeWidth: "1.172",
                                    d: "M141.437 27.019H145.96300000000002V55.528999999999996H141.437z"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("g", {
                            fill: "#999",
                            stroke: "#999",
                            strokeDasharray: "none",
                            strokeLinecap: "butt",
                            strokeMiterlimit: "4",
                            strokeWidth: "1",
                            paintOrder: "markers fill stroke",
                            transform: "matrix(.94316 0 0 .9214 -1.757 -6.004) scale(-1)",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                    d: "M-49.25 -69.4H-44.783V-15.008000000000003H-49.25z"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                    d: "M-42.717 -63.482H-38.106V-20.927H-42.717z"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("path", {
                                    d: "M-36.207 -57.676H-31.408V-26.734H-36.207z"
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("text", {
                    xmlSpace: "preserve",
                    style: {
                        lineHeight: "0"
                    },
                    x: "111.532",
                    y: "49.256",
                    fill: "#0ff00f",
                    fillOpacity: "0.985",
                    stroke: "#2f419c",
                    strokeDasharray: "none",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeMiterlimit: "4",
                    strokeOpacity: "0.965",
                    strokeWidth: ".19",
                    baselineShift: "baseline",
                    fontFamily: "PT Sans",
                    fontSize: "30.837",
                    fontStretch: "normal",
                    fontStyle: "normal",
                    fontVariant: "normal",
                    fontWeight: "normal",
                    opacity: "0.98",
                    paintOrder: "stroke fill markers",
                    transform: "scale(.966 1.03519)",
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("tspan", {
                        style: {
                            lineHeight: 2.73607
                        },
                        x: "111.532",
                        y: "49.256",
                        strokeDasharray: "none",
                        strokeWidth: ".19",
                        baselineShift: "baseline",
                        fontFamily: "PT Sans",
                        fontStretch: "normal",
                        fontStyle: "normal",
                        fontVariant: "normal",
                        fontWeight: "normal",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("tspan", {
                                style: {
                                    fontVariantLigatures: "normal",
                                    fontVariantCaps: "normal",
                                    fontVariantNumeric: "normal",
                                    fontVariantEastAsian: "normal",
                                    textAlign: "center"
                                },
                                fill: "#999",
                                fillOpacity: "1",
                                stroke: "#999",
                                strokeDasharray: "none",
                                strokeOpacity: "1",
                                strokeWidth: ".19",
                                fontFamily: "PT Sans",
                                fontSize: "30.837",
                                fontStretch: "normal",
                                fontStyle: "normal",
                                fontVariant: "normal",
                                fontWeight: "normal",
                                textAnchor: "middle",
                                className: "font-mono",
                                children: "Fit"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("tspan", {
                                style: {
                                    fontVariantLigatures: "normal",
                                    fontVariantCaps: "normal",
                                    fontVariantNumeric: "normal",
                                    fontVariantEastAsian: "normal",
                                    textAlign: "center"
                                },
                                fill: "#999",
                                fillOpacity: "1",
                                stroke: "#999",
                                strokeDasharray: "none",
                                strokeOpacity: "1",
                                strokeWidth: ".19",
                                fontFamily: "PT Sans",
                                fontSize: "20.837",
                                fontStretch: "normal",
                                fontStyle: "normal",
                                fontVariant: "normal",
                                fontWeight: "normal",
                                textAnchor: "middle",
                                children: "&"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("tspan", {
                                style: {
                                    fontVariantLigatures: "normal",
                                    fontVariantCaps: "normal",
                                    fontVariantNumeric: "normal",
                                    fontVariantEastAsian: "normal"
                                },
                                fill: "#e24f00",
                                fillOpacity: "1",
                                stroke: "#e24f00",
                                strokeOpacity: "1",
                                strokeWidth: ".19",
                                fontFamily: "PT Sans",
                                fontSize: "30.837",
                                fontStretch: "normal",
                                fontStyle: "normal",
                                fontVariant: "normal",
                                fontWeight: "normal",
                                className: "font-mono",
                                children: "App"
                            })
                        ]
                    })
                })
            ]
        })
    });
}
/* harmony default export */ const fitAndApp_logo = (FitAndAppLogo);

;// CONCATENATED MODULE: ./src/components/Navbar.tsx
/* __next_internal_client_entry_do_not_use__ Navbar auto */ 








const Navbar = ()=>{
    const globalState = (0,react_.useContext)(GlobalContext.GlobalContext);
    const router = (0,navigation.useRouter)();
    const [loginModal, showLoginModal] = (0,react_.useState)(false);
    const [registerModal, showRegisterModal] = (0,react_.useState)(false);
    const myUrl = (0,navigation.usePathname)();
    const handleLogout = ()=>{
        axiosconfig/* default */.Z.get("/logout").then((res)=>{
            globalState?.setToast({
                type: "success",
                message: res.data.msg
            });
            globalState?.setUserType(null);
        }).then(()=>{
            showLoginModal(false);
            router.replace("/");
        }).catch((err)=>{
            if (err.response) globalState?.setToast({
                type: "error",
                message: err.response.data.msg
            });
        });
    };
    (0,react_.useLayoutEffect)(()=>{
        axiosconfig/* default */.Z.post("/check_user").then((res)=>{
            if (res.data.logged) {
                return globalState?.setUserType(res.data.profile);
            }
            globalState?.setUserType(null);
        }).catch((err)=>{
            if (err.response) globalState?.setToast({
                type: "warning",
                message: err.response.data.msg
            });
        });
    }, [
        handleLogout
    ]);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: `navbar relative z-30 justify-center md:justify-between px-[15vw] 2xl:px-[18vw] p-4 ${myUrl !== "/" ? "bg-neutral" : "bg-gray-200/20"}  `,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("a", {
                        href: "/",
                        className: "w-48 md:w-56",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(fitAndApp_logo, {})
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "flex items-center font-bold gap-4",
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "dropdown dropdown-end",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                        tabIndex: 0,
                                        className: `${myUrl !== "/" ? "text-secondary" : "text-white"} font-normal font-mono text-sm lg:text-lg m-1 cursor-pointer hover:text-secondary my-list-item`,
                                        children: "PLANILHA"
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                                        tabIndex: 0,
                                        className: "my-dropdown",
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                className: "",
                                                children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                    className: "my-list-item",
                                                    href: "/planilha/construtor_planilha",
                                                    children: "Criar Planilha"
                                                })
                                            }),
                                            /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                className: "",
                                                children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                    className: "my-list-item",
                                                    href: "/planilha/minhas_planilhas",
                                                    children: "Minhas Planilhas"
                                                })
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "dropdown dropdown-end w-6",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                        tabIndex: 0,
                                        className: `cursor-pointer w-32 ${myUrl !== "/" ? "text-secondary" : "text-white"} hover:text-secondary`,
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(profilecircle/* ProfileSvg */.l, {})
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                                        tabIndex: 0,
                                        className: "my-dropdown",
                                        children: [
                                            globalState?.userType === null && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("ul", {
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                        children: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                            className: "my-list-item ",
                                                            onClick: ()=>{
                                                                showLoginModal(true);
                                                            },
                                                            children: "Login"
                                                        })
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                        children: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                            className: "my-list-item",
                                                            onClick: ()=>showRegisterModal(true),
                                                            children: "Cadastrar"
                                                        })
                                                    })
                                                ]
                                            }),
                                            globalState?.userType === "user" && /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                        children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                            href: "/perfil",
                                                            className: "my-list-item",
                                                            children: "Perfil"
                                                        })
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                        children: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                            className: "my-list-item",
                                                            onClick: handleLogout,
                                                            children: "Sair"
                                                        })
                                                    })
                                                ]
                                            }),
                                            globalState?.userType === "trainer" && /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                        children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                            href: "/perfil",
                                                            className: "my-list-item",
                                                            children: "Perfil"
                                                        })
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                        children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                                            href: "/alunos",
                                                            className: "my-list-item",
                                                            children: "Alunos"
                                                        })
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("li", {
                                                        children: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                                            className: "my-list-item",
                                                            onClick: handleLogout,
                                                            children: "Sair"
                                                        })
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            loginModal && /*#__PURE__*/ jsx_runtime_.jsx(components_LoginModal, {
                showLoginModal: showLoginModal
            }),
            registerModal && /*#__PURE__*/ jsx_runtime_.jsx(components_RegisterModal, {
                showRegisterModal: showRegisterModal
            })
        ]
    });
};


/***/ }),

/***/ 1798:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   d: () => (/* binding */ ValidateRegisterInput),
/* harmony export */   j: () => (/* binding */ ValidateEditInput)
/* harmony export */ });
const ValidateRegisterInput = (registerInput)=>{
    for(const e in registerInput){
        if (e.length === 0) {
            return {
                valid: false,
                message: "Preencha todos os campos."
            };
        }
    }
    if (registerInput.name.length < 5) {
        return {
            valid: false,
            message: "Nome m\xednimo de 5 d\xedgitos."
        };
    } else if (registerInput.password.length < 8) {
        return {
            valid: false,
            message: "Senha de no m\xednimo 8 d\xedgitos"
        };
    } else if (registerInput.password !== registerInput.password_confirm) {
        return {
            valid: false,
            message: "Erro na confirma\xe7\xe3o de senha."
        };
    } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(registerInput.email) === false) {
        return {
            valid: false,
            message: "Formato do Email inv\xe1lido."
        };
    }
    return {
        valid: true,
        message: "Cadastro realizado."
    };
};
const ValidateEditInput = (editInput)=>{
    for(const e in editInput){
        if (e.length === 0) {
            return {
                valid: false,
                message: "Preencha todos os campos."
            };
        }
    }
    if (editInput?.name?.length < 5) {
        return {
            valid: false,
            message: "Nome m\xednimo de 5 d\xedgitos."
        };
    }
    return {
        valid: true,
        message: "Mensagem irrelevante."
    };
};


/***/ }),

/***/ 3570:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GlobalContext: () => (/* binding */ GlobalContext),
/* harmony export */   GlobalProvider: () => (/* binding */ GlobalProvider)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* __next_internal_client_entry_do_not_use__ GlobalContext,GlobalProvider auto */ 

const GlobalContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(null);
const GlobalProvider = ({ children })=>{
    const [toast, setToast] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        type: null,
        message: null
    });
    const [isDragDisabledState, isDragDisabledSwitch] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [userType, setUserType] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(GlobalContext.Provider, {
        value: {
            toast,
            setToast,
            isDragDisabledState,
            isDragDisabledSwitch,
            userType,
            setUserType
        },
        children: children
    });
};


/***/ }),

/***/ 8885:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MyToast: () => (/* binding */ MyToast)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _GlobalContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3570);
/* __next_internal_client_entry_do_not_use__ MyToast auto */ 


const MyToast = ()=>{
    const globalState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(_GlobalContext__WEBPACK_IMPORTED_MODULE_2__.GlobalContext);
    const [toastClass, setToastClass] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("translate-y-[-420%]");
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (globalState?.toast.type === null) return;
        let color;
        if (globalState?.toast.type === "success") {
            color = "bg-success";
        } else if (globalState?.toast.type === "warning") {
            color = "bg-warning";
        } else {
            color = "bg-error";
        }
        setToastClass("translate-y-0 " + color);
        setTimeout(()=>{
            setToastClass("translate-y-[-420%]");
            globalState?.setToast({
                type: null,
                message: ""
            });
        }, 2000);
    }, [
        globalState
    ]);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: `fixed flex w-72 justify-center items-center  transition duration-700 ease-in-out ${toastClass} right-4 top-[15vh] sm:w-[25%] h-16 z-50 rounded-lg  `,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
            className: "text-md text-white font-sans",
            children: globalState?.toast.message
        })
    });
};


/***/ }),

/***/ 7649:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(248);

const config = {
    baseURL: "https://fit-api-fduu.onrender.com",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json;charset=utf-8",
        "Access-Control-Allow-Origin": "http://localhost:8080/"
    }
};
console.log("BASE URLL", process.env.BASE_URL);
const myHTTP = axios__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z.create(config);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (myHTTP);


/***/ }),

/***/ 9110:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   l: () => (/* binding */ ProfileSvg)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9483);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_1__);
/* __next_internal_client_entry_do_not_use__ ProfileSvg auto */ 

const ProfileSvg = ()=>{
    const myUrl = (0,next_navigation__WEBPACK_IMPORTED_MODULE_1__.usePathname)();
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("svg", {
            className: `flex fill-current`,
            viewBox: "0 0 20 20",
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("g", {
                className: "",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("g", {
                    fill: "currentColor",
                    fillRule: "evenodd",
                    stroke: "none",
                    strokeWidth: "2",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("g", {
                        transform: "translate(-380 -2159)",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("g", {
                            transform: "translate(56 160)",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                                d: "M334 2011c3.785 0 6.958 2.214 7.784 6h-15.568c.826-3.786 3.999-6 7.784-6m-4-6c0-2.206 1.794-4 4-4s4 1.794 4 4-1.794 4-4 4-4-1.794-4-4m7.758 4.673A5.983 5.983 0 00340 2005a6 6 0 10-9.758 4.673c-3.659 1.375-6.242 4.772-6.242 9.327h20c0-4.555-2.583-7.952-6.242-9.327"
                            })
                        })
                    })
                })
            })
        })
    });
};


/***/ }),

/***/ 2125:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ RootLayout),
  metadata: () => (/* binding */ metadata)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(6786);
// EXTERNAL MODULE: ./node_modules/next/font/google/target.css?{"path":"src/app/layout.tsx","import":"Josefin_Sans","arguments":[{"subsets":["latin"],"display":"swap","variable":"--font-josefin"}],"variableName":"Josefin"}
var layout_tsx_import_Josefin_Sans_arguments_subsets_latin_display_swap_variable_font_josefin_variableName_Josefin_ = __webpack_require__(3234);
var layout_tsx_import_Josefin_Sans_arguments_subsets_latin_display_swap_variable_font_josefin_variableName_Josefin_default = /*#__PURE__*/__webpack_require__.n(layout_tsx_import_Josefin_Sans_arguments_subsets_latin_display_swap_variable_font_josefin_variableName_Josefin_);
// EXTERNAL MODULE: ./node_modules/next/font/google/target.css?{"path":"src/app/layout.tsx","import":"Source_Sans_3","arguments":[{"subsets":["latin"],"display":"swap","variable":"--font-sourcesans"}],"variableName":"SourceSans"}
var layout_tsx_import_Source_Sans_3_arguments_subsets_latin_display_swap_variable_font_sourcesans_variableName_SourceSans_ = __webpack_require__(4729);
var layout_tsx_import_Source_Sans_3_arguments_subsets_latin_display_swap_variable_font_sourcesans_variableName_SourceSans_default = /*#__PURE__*/__webpack_require__.n(layout_tsx_import_Source_Sans_3_arguments_subsets_latin_display_swap_variable_font_sourcesans_variableName_SourceSans_);
// EXTERNAL MODULE: ./src/app/globals.css
var globals = __webpack_require__(5553);
// EXTERNAL MODULE: ./node_modules/next/dist/build/webpack/loaders/next-flight-loader/module-proxy.js
var module_proxy = __webpack_require__(1313);
;// CONCATENATED MODULE: ./src/components/Navbar.tsx

const proxy = (0,module_proxy.createProxy)(String.raw`/home/cabral/Projects/Fit-App/fit-app/src/components/Navbar.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;

const e0 = proxy["Navbar"];

;// CONCATENATED MODULE: ./src/services/GlobalContext.tsx

const GlobalContext_proxy = (0,module_proxy.createProxy)(String.raw`/home/cabral/Projects/Fit-App/fit-app/src/services/GlobalContext.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule: GlobalContext_esModule, $$typeof: GlobalContext_$$typeof } = GlobalContext_proxy;
const GlobalContext_default_ = GlobalContext_proxy.default;

const GlobalContext_e0 = GlobalContext_proxy["GlobalContext"];

const e1 = GlobalContext_proxy["GlobalProvider"];

;// CONCATENATED MODULE: ./src/services/MyToast.tsx

const MyToast_proxy = (0,module_proxy.createProxy)(String.raw`/home/cabral/Projects/Fit-App/fit-app/src/services/MyToast.tsx`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule: MyToast_esModule, $$typeof: MyToast_$$typeof } = MyToast_proxy;
const MyToast_default_ = MyToast_proxy.default;

const MyToast_e0 = MyToast_proxy["MyToast"];

// EXTERNAL MODULE: ./node_modules/next/dist/client/components/noop-head.js
var noop_head = __webpack_require__(252);
var noop_head_default = /*#__PURE__*/__webpack_require__.n(noop_head);
;// CONCATENATED MODULE: ./src/app/layout.tsx








const metadata = {
    title: "Fit-App",
    description: "Fitness App"
};
function RootLayout({ children }) {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("html", {
        lang: "pt-br",
        "data-theme": "mytheme",
        className: `${(layout_tsx_import_Josefin_Sans_arguments_subsets_latin_display_swap_variable_font_josefin_variableName_Josefin_default()).variable} ${(layout_tsx_import_Source_Sans_3_arguments_subsets_latin_display_swap_variable_font_sourcesans_variableName_SourceSans_default()).variable} font-mono scroll-smooth`,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx((noop_head_default()), {
                children: /*#__PURE__*/ jsx_runtime_.jsx("meta", {
                    charSet: "utf-8"
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("body", {
                className: `h-screen bg-white font-normal  overflow-x-hidden relative`,
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(e1, {
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(e0, {}),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx(MyToast_e0, {}),
                                children
                            ]
                        })
                    ]
                })
            })
        ]
    });
}


/***/ }),

/***/ 2819:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3180);
/* harmony import */ var next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__);
  

  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((props) => {
    const imageData = {"type":"image/x-icon","sizes":"any"}
    const imageUrl = (0,next_dist_lib_metadata_get_metadata_route__WEBPACK_IMPORTED_MODULE_0__.fillMetadataSegment)(".", props.params, "favicon.ico")

    return [{
      ...imageData,
      url: imageUrl + "",
    }]
  });

/***/ }),

/***/ 5553:
/***/ (() => {



/***/ })

};
;