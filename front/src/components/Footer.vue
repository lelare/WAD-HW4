<template>
    <footer>
        <div>&copy; 2023. WAD-HW All rights reserved</div>
        <nav>
            <ul>
                <li>
                    <router-link to="/terms">Terms of Service</router-link>
                </li>
                <li>
                    <router-link to="/privacy">Privacy policy</router-link>
                </li>
            </ul>
        </nav>
    </footer>
</template>

<style lang="scss" scoped>
footer {
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    text-align: center;
    background-color: lightgrey;
    border-radius: 10px;
    font-size: 14px;

    @media (max-width: 480px) {
        flex-direction: column-reverse;
        row-gap: 10px;
    }

    nav {
        ul {
            display: flex;
            align-items: center;

            li {
                margin-left: 18px;

                @media (max-width: 480px) {
                    margin: 0 8px;
                }

                a {
                    color: black;

                    &:hover {
                        color: #34495e;
                    }
                }
            }
        }
    }
}
</style>
