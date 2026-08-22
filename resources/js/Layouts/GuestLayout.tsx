export default function GuestLayout({ children }: { children: React.ReactNode }) {
    const colors = {
        background: '#F0FDF4',
        card: '#FFFFFF',
        border: '#86EFAC',
    };

    return (
        <div 
            className="flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0 px-4 sm:px-6"
            style={{ 
                background: 'linear-gradient(135deg, #166534 0%, #65A30D 50%, #EAB308 100%)'
            }}
        >
            <div 
                className="mt-6 w-full overflow-hidden px-6 py-8 sm:max-w-md rounded-3xl"
                style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    borderWidth: '2px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                }}
            >
                {children}
            </div>
        </div>
    );
}
