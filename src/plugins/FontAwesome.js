import { library } from '@fortawesome/fontawesome-svg-core'
import {faPenAlt} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faPenAlt)

export default (app) => {
    app.component('fa', FontAwesomeIcon)
}
