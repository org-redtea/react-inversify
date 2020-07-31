export function getDisplayName(comp: any) {
    return (
        comp.displayName ||
        comp.name ||
        (comp.constructor && (comp.constructor.displayName || comp.constructor.name))
        || 'Component'
    )
}
