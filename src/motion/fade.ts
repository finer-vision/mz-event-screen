export default (when: number) => ({
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1
    },
    transition: {
        duration: 0.5,
        delay: when*0.5
    }
})