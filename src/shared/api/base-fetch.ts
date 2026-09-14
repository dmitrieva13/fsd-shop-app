const MOCK_DATA: Record<string, any> = {
    '/products': [
      { id: '1', name: 'Молоко', price: 85, countLeft: 28, imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/035/176/109/small/spectral-sophistication-blank-milk-bottle-mockup-on-transparent-background-free-png.png' },
      { id: '2', name: 'Сыр гауда', price: 180, countLeft: 8, imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/060/587/554/small/creamy-yellow-cheese-with-heart-shaped-and-irregular-holes-png.png' },
      { id: '3', name: 'Сыр пармезан', price: 240, countLeft: 2, imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/046/013/741/small/realistic-photograph-of-cheese-on-transparency-background-png.png' },
      { id: '4', name: 'Хлеб', price: 75, countLeft: 100, imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/070/129/276/small/delicious-loaf-of-crusty-bread-golden-baked-food-on-transparent-background-png.png' },
      { id: '5', name: 'Филе бедра куринное', price: 399, countLeft: 1, imageUrl: '' },
      { id: '6', name: 'Яйца куринные С0', price: 110, countLeft: 7, imageUrl: '' },
      { id: '7', name: 'Яйца куринные С1', price: 100, countLeft: 10, imageUrl: '' },
      { id: '8', name: 'Томаты', price: 210, countLeft: 40, imageUrl: 'https://free-png.ru/wp-content/uploads/2022/02/free-png.ru-407.png' },
      { id: '9', name: 'Огурцы', price: 185, countLeft: 25, imageUrl: 'https://pngimg.com/uploads/cucumber/cucumber_PNG12606.png' },
      { id: '10', name: 'Яйца перепелинные', price: 200, countLeft: 1, imageUrl: 'https://spar-online.ru/upload/iblock/dd1/dd1e958b763c8f49dbf2513be1a56363.png' },
      { id: '11', name: 'Кетчуп томатный', price: 79, countLeft: 9, imageUrl: '' },
      { id: '12', name: 'Молочный коктейль', price: 35, countLeft: 1, imageUrl: '' },
      { id: '13', name: 'Шоколад', price: 120, countLeft: 30, imageUrl: 'https://png.pngtree.com/png-clipart/20240318/original/pngtree-chocolate-bar-png-png-image_14617233.png' },
      { id: '14', name: 'Торт \"Красный бархат\" Мирель 700г', price: 819, countLeft: 3, imageUrl: 'https://static.vecteezy.com/system/resources/thumbnails/049/349/977/small/a-red-velvet-cake-isolated-on-transparent-background-png.png' },
    ],
    '/cart': []
  };
  
  export async function apiGet<T>(fetchStr: string): Promise<T> {
    if (fetchStr in MOCK_DATA) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(MOCK_DATA[fetchStr] as T);
        }, 500);
      });
    }

    throw new Error("invalid request");
}