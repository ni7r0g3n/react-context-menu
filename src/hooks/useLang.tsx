import { useEffect, useState } from "react"

const langs = {
    en: {
        "aria-label": "Context menu container. Press enter or space when focusing this element or a children to open it.",
        "contextmenu": "Context menu. Use tab or arrow keys to navigate options. Esc to close.",
        "contextmenuitem": "Context menu option. Press enter or space to select it."
    },
    it: {
        "aria-label": "Contenitore del menu contestuale. Premi invio o spazio quando questo elemento o un figlio è in focus per aprirlo.",
        "contextmenu": "Menu contestuale. Usa tab o le frecce per navigare tra le opzioni. Esc per chiudere.",
        "contextmenuitem": "Opzione del menu contestuale. Premi invio o spazio per selezionarla."
    },
    es: {
        "aria-label": "Contenedor del menú contextual. Presione enter o espacio cuando este elemento o un hijo esté enfocado para abrirlo.",
        "contextmenu": "Menú contextual. Use tab o las teclas de flecha para navegar por las opciones. Esc para cerrar.",
        "contextmenuitem": "Opción del menú contextual. Presione enter o espacio para seleccionarlo."
    },
    fr: {
        "aria-label": "Conteneur de menu contextuel. Appuyez sur Entrée ou Espace lorsque cet élément ou un enfant est en focus pour l'ouvrir.",
        "contextmenu": "Menu contextuel. Utilisez Tab ou les touches fléchées pour naviguer dans les options. Esc pour fermer.",
        "contextmenuitem": "Option de menu contextuel. Appuyez sur Entrée ou Espace pour le sélectionner."
    },
    de: {
        "aria-label": "Kontextmenü-Container. Drücken Sie die Eingabetaste oder die Leertaste, wenn dieses Element oder ein Kind fokussiert ist, um es zu öffnen.",
        "contextmenu": "Kontextmenü. Verwenden Sie Tab oder Pfeiltasten, um die Optionen zu navigieren. Esc zum Schließen.",
        "contextmenuitem": "Kontextmenüoption. Drücken Sie die Eingabetaste oder die Leertaste, um sie auszuwählen."
    },
    pt: {
        "aria-label": "Contêiner de menu de contexto. Pressione enter ou espaço quando este elemento ou um filho estiver em foco para abri-lo.",
        "contextmenu": "Menu de contexto. Use tab ou as setas para navegar nas opções. Esc para fechar.",
        "contextmenuitem": "Opção de menu de contexto. Pressione enter ou espaço para selecioná-lo."
    },
}

export function useLang() {
    const [lang, setLang] = useState('en')
    useEffect(() => {
        const browserLang = navigator.language.split('-')[0]
        if (langs[browserLang])
            setLang(browserLang)
    }, [])
    return langs[lang]
}

