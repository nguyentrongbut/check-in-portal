import Link from "next/link";
import Image from "next/image";

const Logo = ({href = '/'} : {href?: string}) => {
    return (
        <Link href={href} className="flex items-center space-x-4">
            <Image src='/localhunt-icon.png' alt='Local Hunt'
                   width={60}
                   height={50}
            />
            <span className="text-2xl font-bold">Local Hunt</span>
        </Link>
    )
}

export default Logo