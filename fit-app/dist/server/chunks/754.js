"use strict";
exports.id = 754;
exports.ids = [754];
exports.modules = {

/***/ 1817:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Qd: () => (/* binding */ formatExercisesStorage),
/* harmony export */   Wu: () => (/* binding */ ValidateAddExercise),
/* harmony export */   cv: () => (/* binding */ triggerDnd),
/* harmony export */   kQ: () => (/* binding */ validateSpreadsheet),
/* harmony export */   p6: () => (/* binding */ formatDate)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var date_fns_format__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(215);


const ValidateAddExercise = (exercise)=>{
    if (!exercise.exercise_name || !exercise.quantity || !exercise.sets) {
        alert("Preencha todos os campos");
        return false;
    }
    return true;
};
const formatDate = (dateStr)=>{
    const parsedString = new Date(dateStr);
    return (0,date_fns_format__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z)(parsedString, "dd-MM-yyyy HH:mm");
};
const validateSpreadsheet = (daysArray, globalState)=>{
    if (globalState?.userType === null) return {
        type: "warning",
        message: "Fa\xe7a login para salvar."
    };
    if (daysArray.length === 0) return {
        type: "warning",
        message: "Adicione dias."
    };
    let emptyDay = false;
    daysArray.forEach((ele)=>{
        if (ele.exercises.length === 0) emptyDay = true;
    });
    if (emptyDay) return {
        type: "warning",
        message: "Preencha todos os dias."
    };
    return null;
};
const formatExercisesStorage = (responseExerciseList)=>{
    const ObjectifiedExerciseList = {
        "Bra\xe7os": [],
        Pernas: [],
        Ombros: [],
        Costas: [],
        Peitoral: []
    };
    responseExerciseList.forEach((ele)=>{
        switch(ele.muscle_group){
            case "Bra\xe7os":
                ObjectifiedExerciseList.Braços.push(ele);
                break;
            case "Pernas":
                ObjectifiedExerciseList.Pernas.push(ele);
                break;
            case "Costas":
                ObjectifiedExerciseList.Costas.push(ele);
                break;
            case "Peitoral":
                ObjectifiedExerciseList.Peitoral.push(ele);
                break;
            case "Ombros":
                ObjectifiedExerciseList.Ombros.push(ele);
                break;
        }
    });
    localStorage.setItem("Exercises_list", JSON.stringify(ObjectifiedExerciseList));
};
const reorder = (list, startIndex, endIndex)=>{
    const result = list;
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};
const reorderExercises = (list, startIndex, endIndex)=>{
    const result = list;
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};
const triggerDnd = (result, daysArray, setNewDayArray, editingSpreadsheet)=>{
    const { source, destination, type } = result;
    if (!destination) {
        return;
    }
    const sourceId = source.droppableId;
    const destinationId = destination.droppableId;
    if (type === "droppableExercise") {
        if (sourceId === destinationId) {
            const tempExercises = daysArray.find((e)=>e.dayUID === sourceId)?.exercises;
            if (tempExercises) {
                const newExerciseOrder = reorderExercises(tempExercises, source.index, destination.index);
                const newDayOrder = daysArray.map((e)=>e.dayUID !== sourceId ? e : {
                        ...e,
                        exercises: newExerciseOrder
                    });
                setNewDayArray(newDayOrder);
            }
        } else {
            const sourceOrder = daysArray.find((e)=>e.dayUID === sourceId)?.exercises;
            const destinationOrder = daysArray.find((e)=>e.dayUID === destinationId)?.exercises;
            if (sourceOrder && destinationOrder) {
                const [removed] = sourceOrder.splice(source.index, 1);
                destinationOrder?.splice(destination.index, 0, removed);
            }
        }
    }
    if (type === "droppableDay") {
        const newDayOrder = reorder(daysArray, source.index, destination.index);
        setNewDayArray(newDayOrder);
    }
    if (!editingSpreadsheet) {
        localStorage.setItem("Ongoing_Spreadsheet", JSON.stringify(daysArray));
    }
};


/***/ }),

/***/ 1491:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const TrashSvg = ({ color })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
            className: "w-full h-auto",
            viewBox: "0 0 24 24",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("g", {
                    id: "SVGRepo_bgCarrier",
                    strokeWidth: "0"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("g", {
                    id: "SVGRepo_tracerCarrier",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("g", {
                    id: "SVGRepo_iconCarrier",
                    children: [
                        " ",
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                            d: "M10 10V16M14 10V16M18 6V18C18 19.1046 17.1046 20 16 20H8C6.89543 20 6 19.1046 6 18V6M4 6H20M15 6V5C15 3.89543 14.1046 3 13 3H11C9.89543 3 9 3.89543 9 5V6",
                            stroke: color,
                            strokeWidth: "1.5",
                            strokeLinecap: "round",
                            strokeLinejoin: "round"
                        }),
                        " "
                    ]
                })
            ]
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TrashSvg);


/***/ })

};
;