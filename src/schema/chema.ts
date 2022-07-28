import {makeSchema} from "nexus"
import {join} from "path"
import * as types from "../graphql/index"

export const schema=makeSchema({
    types:types,
    outputs:{
        schema:join(process.cwd(),"src/types/AllTypes.graphql"), //<-- this is the file that will be generated
        typegen:join(process.cwd(),"src/typegen/nexus-typegen.ts")
    },
    contextType:{
        module:join(process.cwd(),"./src/schema/context.ts"),
        export:"Context"
    }
})