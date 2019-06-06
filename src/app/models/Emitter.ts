export interface Emitter {
    name: string;
    value: EnumEmitter;
}

enum EnumEmitter {
    SPTC = 1,
    CREA = 2,
    CTPS = 3,
}

const emittersOptions: Emitter[] = [
    {
        name: 'SPTC',
        value: EnumEmitter.SPTC
    },
    {
        name: 'CREA',
        value: EnumEmitter.CREA,
    },
    {
        name: 'CTPS',
        value: EnumEmitter.CTPS
    }
];

export { emittersOptions };
