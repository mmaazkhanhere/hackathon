# Ecommerce Website Using Next.js 13 (App Router), TypeScript, and TailwindCSS

## Table of contents

- [Overview](#overview)
  - [Stack](#stack)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [What I learned](#what-i-learned)
  - [Useful Resources](#userful-resoucres)

## Overview
This website utilizes the latest web development technologies, including Next.js 13, TypeScript, and Tailwind CSS, to create an ecommerce template. The primary purpose of this website is to showcase a comprehensive e-commerce platform with a wide range of features and functionalities.

The website is structured into three sections, namely male, female, and all products, providing users with distinct categories to browse. Upon landing on the website, users are immediately presented with an intuitive and visually appealing interface that captivates their attention. The design of the website prioritizes user-friendliness, ensuring effortless navigation and accessibility for visitors regardless of their technical expertise.

To populate the product data and images, the website utilizes Sanity CMS and employs dynamic routes. Each product's unique URL is generated based on its slug. Customers are able to select various sizes for shirts, sweatshirts, jackets, and pants. When a customer adds a product to their cart, the information is stored in the Vercel database for later retrieval and processing.

## Stack
- Next.js 13 App Router (React Framework)
- TypeScript
- Tailwind CSS (Styling Framework)
- Sanity Studion V3 (Content Management System)
- Redux (State Management)
- Swiper (Product Carousel)
- React Toastify (Notifications)
- Vercel Postgres (Database)
- Drizzle (Database ORM)
- React Icons (Icons)
- Stripe (Payment Integration)

### Screenshot
![Homepage](https://github.com/mmaazkhanhere/hackathon/assets/115078151/5c3003e4-7e1a-49db-a8fa-61059268c244)
![All Product](https://github.com/mmaazkhanhere/hackathon/assets/115078151/3a6fcbd6-1e97-4a02-9155-ade34f335bd2)
![Product page](https://github.com/mmaazkhanhere/hackathon/assets/115078151/6d2cb7d4-be48-4e6b-a854-9ad4a5a45439)
![Cart Page](https://github.com/mmaazkhanhere/hackathon/assets/115078151/f5941912-8170-48a9-8b65-ac1eb49deb12)
![Stripe Integration](https://github.com/mmaazkhanhere/hackathon/assets/115078151/6b494588-d32a-4d3c-be03-1746ab59a8b6)
![Checkout complete](https://github.com/mmaazkhanhere/hackathon/assets/115078151/8bb770ee-cfdf-421f-98c7-0c5631c8725a)

### Links

- Live Site URL: https://hackathon-ecommerce-mmaazkhanhere.vercel.app/

## What I learned
This hackathon project was a challengeing and an excellent opportunity to advance my skills and learn new and efficient ways of doing things. 

I learned using Sanity with Nextjs for product data and images. I learned creating type schema for the products, categorising the products into different categories, fetching the product into their respective category website section. The following is a demo groq query for fetching only male products

```
const getMaleData = async () => {
    const res = await client.fetch(`*[_type == "product" && category._ref=="c3fc129e-6a58-4dac-b3c3-63b6d4434930"]{
    name,
    sub_cat,
    price,
    product_info,
    image,
    "slug":slug.current,
}
`)
    return res;
}
```

One of the most challenging part of the project was dynamic routing and fetching products in these dynamic routes. With teachers guidance and referring to internet community, I was able to fetch products in dynamic routes. Here is how i was able to do it

```
interface IProduct {
  name: string,
  sub_cat: string,
  price: number,
  image: IImage,
  product_info: string
}


export const getProduct = async (slug: string): Promise<IProduct> => {
  try {
    const query = `*[_type=="product"&& slug.current=="${slug}"]{
    name,
    price,
    image,
    sub_cat,
    product_info
}`;

    // Fetch data using the query
    const data = await client.fetch<IProduct[]>(query, { slug });

    // Return the fetched data
    return data[0];
  } catch (error) { throw new Error('Cannot fetch product') }
};
```
The product was fetched using the useState and useEffect. The logo of the ecommerce company will be displayed while the product detail is fetched when clicked upon by the customer
```
const [data, setData] = useState<IProduct | null>(null);

 useEffect(() => {
        const fetchData = async () => {
            try {
                const productData = await getProduct(params.slug);
                setData(productData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [params.slug]);


    if (data === null) {
        return <div className='w-full h-screen flex items-center justify-center'>
            <Image src="/Logo.webp" alt='Logo Picture' width={200} height={200} />
        </div>;
    }
```


For Cart functionality management, i used Redux which was new for me. After watching tutorials, i was successful in implementing add to cart functionality using redux. 

```
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        addToCart: (state, action: PayloadAction<ICartItem>) => {
            const item = state.cartItems.find((p) => p.name === action.payload.name);
            if (item) {
                item.quantity++;
                item.price = item.oneQuantityPrice * item.quantity
            }
            else {
                state.cartItems.push({ ...action.payload, quantity: 1 });
            }
        },

        updateCart: (state, action: PayloadAction<ICartItem>) => {
            const { name, quantity, oneQuantityPrice } = action.payload;
            const existingItem = state.cartItems.find((item) => item.name === name);

            if (existingItem) {
                existingItem.quantity = quantity;
                existingItem.price = oneQuantityPrice * quantity
            }
        },

        removeFromCart: (state, action: PayloadAction<string>) => {
            state.cartItems = state.cartItems.filter(
                (item) => item.name !== action.payload
            );
        },
    },
});
```
Another challenging part of the project was saving a customer cart to items and inserting those items into the database for that specific user. For that, I created a unique user id for every customer using uuid and cookies. The following code showcase how i did it

```
export const POST = async (request: NextRequest) => {

    console.log("POST Response: ", request)
    const req = await request.json();
    const uid = uuid();
    const setCookies = cookies();

    const user_id = cookies().get("user_id")
    if (!user_id) {
        setCookies.set("user_id", uid)
    }

    try {
        const res = await db.insert(cartTable).values({
            product_name: req.product_name,
            quantity: 1,
            user_id: cookies().get("user_id")?.value as string
        }).returning()
        return NextResponse.json({ res })
    } catch (error) {

    }
}
```
In the product page, request was send using the following code
```
const handleAddToCart = async () => {
        const res = await fetch("/api/cart", {
            method: "POST",
            body: JSON.stringify({
                product_name: data.name
            })
        })

        const result = await res.json()
        console.log(result)
    }
```

### Useful resources

- [ChatGPT](https://chat.openai.com/) - This helped me in debugging and code improvement.
- [JS Hindi Dev Ecommerce Video](https://www.youtube.com/watch?v=8xf78RNtfHY&pp=ygUTbmV4dGpzMTMgIGVjb21tZXJjZQ%3D%3D) - This is an amazing tutorial which helped me in implementing Redux.
- [Hamzah Syed](https://www.youtube.com/@hamzahsyed3197)- A youtube channel that helped me in inserting cart items in the vercel database.

