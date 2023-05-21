import { ReactNode } from "react";

function Section({
    className,
    header,
    children,
}: {
    className?: String;
    header?: any;
    children: ReactNode;
}) {
    return (
        <section
            className={`relative border border-gray-400/20 px-5 py-6 rounded-lg ${className}`}
        >
            {header && (
                <header className="absolute -top-3 font-bold left-5">
                    <span className="rounded-xl p-0 m-0">{header}</span>
                </header>
            )}
            <div>{children}</div>
        </section>
    );
}
export default Section;
