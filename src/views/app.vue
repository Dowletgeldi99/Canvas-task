<template>
    <div id = "app">
        <Canvas></Canvas>
    </div>
</template>

<script>
    import Canvas from '../components/canvas';

    export default {
        components: {
            Canvas
        },
        data() {
            return {

            }
        }
    }
</script>

<style lang = 'scss'>
    body {
        margin: 0;
    }

    .nav {
        text-align: center;
        background-color: #000;
        padding: 20px 0 20px;
        
        a {
            text-decoration: none;
            padding: 20px;
            font-size: 25px;
            color: #fff;
        }

        a:hover {
            color: #f20c0c;
            transition: all 0.6s ease-out;
        }
    }
</style>