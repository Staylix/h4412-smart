
export const globalURL = "http://localhost:3003"            // Dev
// export const globalURL = "http://34.254.201.124:3003"    // Prod


export const theme = {
    global: {
        colors: {
            brand: '#F2696C',
            brandPink: '#F2696C',
            brandBlue: '#61D8BC',
            brandOrange: '#EFA059',
            white: '#FFFFFF',
            dark: '#1E1A3E',
            focus: '#61D8BC',
            "accent-1": '#61D8BC',
            "accent-2": '#F2696C',
        },
        font: {
            family: 'Roboto',
            size: '14px',
            height: '20px',
        },
    },
};

export const flexStyle = { flex: 1 }

export const params = {
    masterPage: {
        direction: 'column',
        align: 'center',
        justify: 'between',
        pad: { horizontal: 'medium', top: 'medium', bottom: 'none' },
    },
    page: {
        style: { height: '86vh', width: '100%' },
        direction: "column",
    },
    head: {
        fill: "horizontal",
        direction: "row",
        justify: "between",
        margin: { bottom: "small" }
    },
    scrollContainer: {
        style: { height: '30vh', width: '100%', overfloxY: "auto", display: "block" },
        direction: "column",
    },
}

export const appBarTabsStyles = {
    true: {
        color: "#F2696C",
        backgroundColor: "white"
    },
    false: {
        color: "white",
        backgroundColor: "#F2696C"
    }
};