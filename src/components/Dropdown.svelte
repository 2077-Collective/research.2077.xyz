<script lang="ts">
    import ChevronDown from './icons/ChevronDown.svelte'
</script>

<div class="group flex flex-col relative">
    <button class="dropbtn flex gap-x-2 items-center dark:hover:text-green">
        Resources
        <ChevronDown />
    </button>

    <div
        class="group-hover:block rounded bg-black dark:bg-gray sidebar p-2 absolute hidden top-6 w-max"
    >
        <a
            href="https://2077.xyz"
            target="_blank"
            class="block px-4 py-2 hover:bg-green text-white hover:text-black hover:rounded"
        >
            2077 Collective
        </a>

        <a
            href="https://eips.wiki"
            target="_blank"
            class="block px-4 py-2 hover:bg-green text-white hover:text-black hover:rounded"
        >
            EIP Wiki
        </a>

        <a
            href="https://etherpedia.2077.xyz"
            target="_blank"
            class="block px-4 py-2 hover:bg-green text-white hover:text-black hover:rounded"
        >
            Etherpedia
        </a>
    </div>
</div>
