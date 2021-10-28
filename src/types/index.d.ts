export type TransactionType = {
    id : number
    nominal? : number
    keterangan? : string
    type? : "pengeluaran" | "pemasukan"
    date? : string
}

export type AuthType = {
    username : string
    password : string
}

export type TransactionForm = {
    nominal? : number
    keterangan? : string
    type? : "pengeluaran" | "pemasukan"
    date? : string
}
