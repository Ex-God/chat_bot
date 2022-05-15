export const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min) ) + min;
}

export const smoothScroll = (element) => {
    element.scrollBy({
        top: 9999,
        behavior: 'smooth'
    }) 
}