import { defineField, defineType } from "sanity";

export const product = defineType({
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Product Name',
            type: 'string'
        }),
        defineField({
            name: 'sub_cat',
            title: 'Sub Category',
            type: 'string'
        }),
        defineField({
            name: 'price',
            title: 'Product Price',
            type: 'number'
        }),
        defineField({
            name: 'product_info',
            title: 'Product Info',
            type: 'string'
        }),
        defineField({
            name: 'image',
            title: 'Product Image',
            type: 'image',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 200,
            }
        }),
        defineField({
            name: 'category',
            title: 'Product Category',
            type: 'reference',
            to: [{ type: 'category' }],
        }),
    ]
})