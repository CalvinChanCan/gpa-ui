export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'long', day: 'numeric'};
    return date.toLocaleDateString('en-US', options);
}

export function maskAccount(accountNumber: string): string {
    return "*".repeat(3) + accountNumber.slice(-4);
}


export function formatAmount(amount: number, transactionType: string): string {

    const formattedAmount = amount.toLocaleString("en-US", {minimumFractionDigits: 2});
    if (transactionType === "CREDIT") {
        return `+${formattedAmount}`;
    } else {
        return `-${formattedAmount}`;
    }
}
