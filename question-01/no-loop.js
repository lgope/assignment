const printStarIT = num => num < 11 && (console.log('Star It Ltd.'), printStarIT(++num));
printStarIT(1);
