export abstract class Cast {
    public abstract castObject: (item: any) => any | undefined;

    public castArray(items: any[]): any[] {
        const castedItems: any[] = [];
        for (const item of items) {
            const castedItem: any = this.castObject(item);
            if (castedItem != null) {
                castedItems.push(castedItem);
            }
        }
        return castedItems;
    }
}