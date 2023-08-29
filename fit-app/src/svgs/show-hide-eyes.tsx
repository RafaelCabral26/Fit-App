
export const ShowPassSvg = () => {
    return (
        <div className="pointer-events-none">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={22}
                height={22}
                fill="none"
                viewBox="0 0 20 20"
                className="pointer-events-none"
            >
                <path
                    fill="#000"
                    fillRule="evenodd"
                    d="M3.415 10.242c-.067-.086-.13-.167-.186-.242a16.806 16.806 0 0 1 1.803-2.025C6.429 6.648 8.187 5.5 10 5.5c1.813 0 3.57 1.148 4.968 2.475A16.816 16.816 0 0 1 16.771 10a16.9 16.9 0 0 1-1.803 2.025C13.57 13.352 11.813 14.5 10 14.5c-1.813 0-3.57-1.148-4.968-2.475a16.799 16.799 0 0 1-1.617-1.783zm15.423-.788L18 10l.838.546-.002.003-.003.004-.01.016-.037.054a17.123 17.123 0 0 1-.628.854 18.805 18.805 0 0 1-1.812 1.998C14.848 14.898 12.606 16.5 10 16.5s-4.848-1.602-6.346-3.025a18.806 18.806 0 0 1-2.44-2.852 6.01 6.01 0 0 1-.037-.054l-.01-.016-.003-.004-.001-.002c0-.001-.001-.001.837-.547l-.838-.546.002-.003.003-.004.01-.016a6.84 6.84 0 0 1 .17-.245 18.804 18.804 0 0 1 2.308-2.66C5.151 5.1 7.394 3.499 10 3.499s4.848 1.602 6.346 3.025a18.803 18.803 0 0 1 2.44 2.852l.037.054.01.016.003.004.001.002zM18 10l.838-.546.355.546-.355.546L18 10zM1.162 9.454 2 10l-.838.546L.807 10l.355-.546zM9 10a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm1-3a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"
                />
            </svg>
        </div>
    )
}

export const HidePassSvg = () => {
    return (
        <div className="pointer-events-none">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={22}
                height={22}
                fill="none"
                viewBox="0 0 24 24"
            >
                <path
                    fill="#000"
                    d="M19.707 5.707a1 1 0 0 0-1.414-1.414l-4.261 4.26a4 4 0 0 0-5.478 5.478l-4.261 4.262a1 1 0 1 0 1.414 1.414l4.261-4.26a4 4 0 0 0 5.478-5.478l4.261-4.262Zm-7.189 4.36a2 2 0 0 0-2.45 2.45l2.45-2.45Zm-1.036 3.865 2.45-2.45a2 2 0 0 1-2.45 2.45Zm4.283-9.111C14.63 4.32 13.367 4 12 4 9.148 4 6.757 5.395 4.998 6.906c-1.765 1.517-2.99 3.232-3.534 4.064a1.876 1.876 0 0 0 0 2.06 20.304 20.304 0 0 0 2.748 3.344l1.414-1.414A18.315 18.315 0 0 1 3.18 12c.51-.773 1.598-2.268 3.121-3.577C7.874 7.072 9.816 6 12 6a7.06 7.06 0 0 1 2.22.367l1.545-1.546ZM12 18a7.06 7.06 0 0 1-2.22-.367L8.236 19.18c1.136.5 2.398.821 3.765.821 2.852 0 5.243-1.395 7.002-2.906 1.765-1.517 2.99-3.232 3.534-4.064.411-.628.411-1.431 0-2.06a20.303 20.303 0 0 0-2.748-3.344L18.374 9.04A18.312 18.312 0 0 1 20.82 12c-.51.773-1.598 2.268-3.121 3.577C16.126 16.928 14.184 18 12 18Z"
                    clipRule="evenodd"
                />
            </svg>
        </div>
    )
}