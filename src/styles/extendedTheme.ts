import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    colors: {
        primary: {
            "100": "#C79FD8",
            "200": "#bb8bd0",
            "300": "#b078c8",
            "400": "#a565c1",
            "500": "#8E3EB1",
            "600": "#391947",
            "700": "#2b1335",
            "800": "#1c0c23",
            "900": "#471F59",
        },
        secondary: {
            "100": "#FFEC80",
            "200": "#ffe866",
            "300": "#ffe44d",
            "400": "#ffe033",
            "500": "#FFD800",
            "600": "#665600",
            "700": "#4c4100",
            "800": "#332b00",
            "900": "#806C00",
        },
        "grayish-white": "#EDF2F7"
    },
    styles: {
        global: {
            body: {
                border: 0,
                margin: 0,
                padding: 0,
                bg: 'primary.600',
            },
        },
    },
});

export default theme;