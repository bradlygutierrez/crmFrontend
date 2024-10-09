import Link from "next/link";

export default function DashBoardItem({ nombre, url, icon }) {
    return (
        <Link className="flex items-center px-3 py-2 text-gray-700 transition-colors duration-300 transform rounded-lg hover:bg-gray-100 hover:text-gray-700" href={url}>
           <img
                src={icon} // Use the GIF URL here
                alt={`${nombre} GIF`}
                className="w-7 h-7 object-cover" // Adjust size as needed
            />
            <span className="mx-2 text-sm font-medium flex flex-col">{nombre}</span>
        </Link>
    );
}
