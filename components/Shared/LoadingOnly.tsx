export const LoadingOnly = ({ light }: { light: boolean; }) => {
    return (
        <div className="relative">
            <svg style={{ color: light ? '#1F2937' : 'var(--cero)' }} className="animate-spin h-24 w-24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4zm16 0a8 8 0 01-8 8v-8h8z"></path>
            </svg>
        </div>
    )
}