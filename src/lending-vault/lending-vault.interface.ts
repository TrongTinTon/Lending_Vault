type TLendingVault = {
    hash: string;
    fromAddress: string;
    unixTimestamp: number;
    ownerAddress: string;
    amountDeposited: number;
}

interface ILendingVault {
    hash: string;
    fromAddress: string;
    unixTimestamp: number;
    ownerAddress: string;
    amountDeposited: string;
}

interface ILendingDepositCommands {
    eventID: number;
    timestamp: string;
    type: string;
    specificationVersion: string;
    data: TLendingVault
}

export { ILendingDepositCommands, TLendingVault, ILendingVault };