<script>
    import { onMount } from 'svelte'
    import Discord from './icons/Discord.svelte'
    import Farcaster from './icons/Farcaster.svelte'
    import Twitter from './icons/Twitter.svelte'

    let csrfToken = ''
    let responseMessage = ''

    async function fetchCsrfToken() {
        try {
            const response = await fetch(
                'https://cms.2077.xyz/get-csrf-token/',
                {
                    credentials: 'include',
                },
            )
            const data = await response.json()
            csrfToken = data.csrfToken
        } catch (error) {
            responseMessage =
                'An error occurred while fetching the CSRF token. Please try again.'
        }
    }

    async function handleSubmit(event) {
        event.preventDefault()

        const form = event.target
        const formData = new FormData(form)

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRFToken': csrfToken,
                },
                credentials: 'include',
            })

            if (response.ok) {
                responseMessage = 'Subscription successful!'
            } else {
                const data = await response.json()
                throw new Error(data.message || 'An error occurred')
            }
        } catch (error) {
            responseMessage =
                error.message || 'An error occurred. Please try again.'
        }
    }

    onMount(async () => {
        await fetchCsrfToken()
    })
</script>

<footer
    class="pt-16 px-6 lg:px-32 flex-column flex flex-col gap-16 bg-[url('/footer.png')] bg-cover bg-center"
>
    <div class="grid flex justify-center">
        <a href="/" class="logo">
            <img src="/logo-white.webp" alt="Logo" width="190" height="auto" />
        </a>
    </div>
    <div
        class="flex flex-col items-center justify-center text-white gap-4"
        id="subscribe"
    >
        <div class="text-center flex flex-col justify-center gap-4 w-max">
            <div>
                <h3 class="text-xl sm:text-3xl font-semibold">
                    Your Ethereum Edge
                </h3>
                <p class="text-white text-sm sm:text-md">
                    Get first-hand research delivered by our team of experts.
                </p>
            </div>
            <form
                on:submit={handleSubmit}
                action="https://cms.2077.xyz/newsletter/subscribe/"
                method="post"
                id="subscribe-form"
                class="flex justify-center"
            >
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    class="outline-none rounded-l bg-black border border-green w-max-content p-2 text-sm w-full border-r-none text-sm md:text-md"
                />
                <button
                    type="submit"
                    class="rounded-r bg-green text-black px-2 md:px-4 py-2 font-bold min-w-[110px] min-h-[42px] text-sm md:text-md"
                >
                    Subscribe
                </button>
            </form>
            <span id="response-message" class="text-sm">{responseMessage}</span>
        </div>
    </div>

    <div class="grid gap-y-12 lg:flex lg:justify-between">
        <div class="grid text-center lg:text-left gap-y-2">
            <h3 class="text-white font-semibold text-xl">Resources</h3>
            <div
                class="flex flex-col gap-1 [&>a]:font-semibold [&>a]:text-gray-100"
            >
                <a
                    href="https://2077.xyz"
                    target="_blank"
                    class="hover:text-white"
                >
                    2077 Collective
                </a>
                <a
                    href="https://eips.wiki"
                    target="_blank"
                    class="hover:text-white"
                >
                    EIP Wiki
                </a>
                <a
                    href="https://etherpedia.2077.xyz"
                    target="_blank"
                    class="hover:text-white"
                >
                    Etherpedia
                </a>
            </div>
        </div>

        <div class="flex flex-col text-center gap-2">
            <h3 class="text-white font-semibold text-xl">Community</h3>
            <div class="flex justify-center gap-x-1">
                <a href="https://discord.gg/2077collective" target="_blank">
                    <Discord />
                </a>
                <a
                    href="https://www.farcaster.id/c/2077collective"
                    target="_blank"
                >
                    <Farcaster />
                </a>
                <a href="https://x.com/2077Collective" target="_blank">
                    <Twitter />
                </a>
            </div>
        </div>

        <div class="text-center lg:text-left">
            <h3 class="text-white font-semibold text-xl">Contact</h3>
            <a
                class="font-semibold text-gray-100 hover:text-white"
                href="mailto:admin@2077.xyz"
            >
                admin@2077.xyz
            </a>
        </div>
    </div>

    <div class="text-center text-gray-200 text-sm italic mb-4">
        <p>(C) 2024 2077 Collective. All rights reserved.</p>
    </div>
</footer>

<style>
    footer {
        background-image: url('/footer.png');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        width: 100%;
        height: auto;
    }
</style>
