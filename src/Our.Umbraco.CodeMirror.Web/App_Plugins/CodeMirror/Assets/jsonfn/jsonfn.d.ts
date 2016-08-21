declare module JSONfn {
    function stringify(obj: any): string;
    function parse<T>(str: string) : T;
}