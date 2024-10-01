export default function RootLayout({children}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <body className={" max-w-screen h-screen flex flex-col overflow-x-hidden overscroll-y-auto"}>
            {children}
        </body>

        );
}