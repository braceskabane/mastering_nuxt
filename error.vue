<template>
    <NuxtLayout>
        <div class = "prose">
            <h1>Sh1t happens</h1>   
            <p>We're sorry, but something went wrong.</p>
            <p>Sorry about that.</p>
            <p>
                <strong>{{ error.message }}</strong>
            </p>
        </div>
    </NuxtLayout>
</template>

<script setup>
    const error = useError();
</script>