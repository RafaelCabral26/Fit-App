
const OpenedLockSvg = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="34"
            fill="none"
            stroke="#fff"
            className="stroke-warning" 
            viewBox="0 0 24 24"
        >
            <g>
                <path
                    className="stroke-warning"
                    strokeLinejoin="round"
                    d="M6 19v-8a1 1 0 011-1h10a1 1 0 011 1v8a1 1 0 01-1 1H7a1 1 0 01-1-1z"
                ></path>
                <circle cx="12" cy="15" r="2" strokeLinejoin="round"></circle>
                <path strokeLinejoin="round" d="M8 10V8a4 4 0 118 0v2H8z"></path>
            </g>
        </svg>
    );
}
export default OpenedLockSvg;
