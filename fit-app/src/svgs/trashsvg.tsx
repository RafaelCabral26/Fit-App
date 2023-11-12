const TrashSvg = ({ color }: { color: "#D40431" | "#ffffff" }) => {
    return (
        <>
            <svg className="w-full h-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 10V16M14 10V16M18 6V18C18 19.1046 17.1046 20 16 20H8C6.89543 20 6 19.1046 6 18V6M4 6H20M15 6V5C15 3.89543 14.1046 3 13 3H11C9.89543 3 9 3.89543 9 5V6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" ></path> </g></svg>
        </>
    )
}
export default TrashSvg
