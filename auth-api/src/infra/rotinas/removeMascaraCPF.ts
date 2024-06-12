export function removeMascaraCPF(cpf: string) {
    return cpf.replace(/\./gi,'').replace('-','')
}