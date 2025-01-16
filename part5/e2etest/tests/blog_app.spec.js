const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {

    beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: {
                name: 'Matti Luk',
                username: 'mluu',
                password: 'fso101'
            }
        })
        await request.post('/api/users', {
            data: {
                name: 'Other User',
                username: 'mluu1',
                password: 'fso101'
            }
        })

        await page.goto('/')
    })

    describe('Login', () => {

        test('fails with invalid password', async ({ page }) => {
            loginWith(page, 'mluu', 'fso')
            const locator = page.getByText('wrong credentials')
            await expect(locator).toBeVisible()

        })

        test('succeeds with correct password', async ({ page }) => {

            loginWith(page, 'mluu', 'fso101')
            await expect(page.getByText('Matti Luk logged in')).toBeVisible()
        })

    })

    test('front page can be opened', async ({ page }) => {
        const locator = page.getByText('Log in to application')
        await expect(locator).toBeVisible()
    })

    describe('when logged in', () => {

        beforeEach(async ({ page }) => {
            loginWith(page, 'mluu', 'fso101')
            await expect(page.getByText('Matti Luk logged in')).toBeVisible()
        })


        describe('a new blog:', () => {
            test('can be created', async ({ page }) => {
                createBlog(page, 'mytitle', 'myauthor', 'myurl')
                await expect(page.getByText(`a new blog mytitle by myauthor added`)).toBeVisible()
            })

            test('can be liked', async ({ page }) => {
                createBlog(page, 'mytitle', 'myauthor', 'myurl')
                await page.getByRole('button', { name: 'show' }).click()
                await page.getByRole('button', { name: 'show' }).click()
                await expect(page.getByText('Likes: 0')).toBeVisible()
                await page.getByRole('button', { name: 'like' }).click()
                await expect(page.getByText('Likes: 1')).toBeVisible()
            })

            test('can be deleted', async ({ page }) => {
                createBlog(page, 'mytitle', 'myauthor', 'myurl')
                await page.getByRole('button', { name: 'show' }).click()
                await page.getByRole('button', { name: 'show' }).click()
                page.on('dialog', dialog => dialog.accept());
                await page.getByRole('button', { name: 'remove' }).click()
                await expect(page.getByText('Blog Titled: mytitle Deleted')).toBeVisible()
            })

        })

    })

    describe('other user', () => {

        test('cannot delete owners blog', async ({ page }) => {
            await loginWith(page, 'mluu', 'fso101')
            await createBlog(page, 'mytitle', 'myauthor', 'myurl')
            await page.getByRole('button', { name: 'logout' }).click()
            await loginWith(page, 'mluu1', 'fso101')
            await page.getByRole('button', { name: 'show' }).click()
            await page.getByRole('button', { name: 'show' }).click()
            await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
        })
    })

    test.only('blogs are arranged in order of increasing likes', async ({ page }) => {

        await loginWith(page, 'mluu', 'fso101')
        await createBlog(page, 'blog1', 'myauthor', 'myurl')
        await createBlog(page, 'blog2', 'myauthor', 'myurl')
        await createBlog(page, 'blog3', 'myauthor', 'myurl')
        await page.waitForTimeout(5000);
        
        await page.getByRole('button', { name: 'show' }).click()
        const showbtns = await page.getByRole('button', { name: 'show' }).all()
        await showbtns[2].click()
        await page.getByRole('button', { name: 'like' }).click()
        const listitems = await page.getByRole('listitem').all()
        await expect(listitems[0]).toHaveText('Title: blog3');
    })

})

