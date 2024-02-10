import * as express from "express";

const app = express();

interface ControllerRoutes {
    [endpoint: string]: {
        method: string,
        endpointPath: string;
        defaultStatus: number;
        middleware: express.Handler[];
    }
}

interface RouteRegistry {
    [controllerName: string]: ControllerRoutes;
}

const registry: RouteRegistry = {}

function Controller(path: string) {
    registry[path] = {};
    return function(constructor: Function) {
        console.log(`We have a controller '${constructor.name}' with path '${path}'`);
        console.log(registry[constructor.name])   
    }
}
// IT SHOULDNT MODIFY THE FUNCTION, RATHER JUST UPDATE THE ROUTE REGISTRY
function Post(endpoint: string) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor) {

    if(!(target.constructor.name in registry)){
        registry[target.constructor.name] = {}
    }

    registry[target.constructor.name]["POST /foo"] = {
        method: "post",
        endpoint: endpoint,
        handler: async (req, res) => {
            const data = await descriptor.value(req.context, req.user, req.body);
            res.send(data);
        }
    }
  };
}


@Controller("/meals")
class MealsController {
    // implement controller

    @Post("/")
    @Auth("OAUTH2")
    @Schema(SomeSchema)
    async createMeal(context, user, body) {
        return await Meals.create(body);
    }

    @Get("/")
    @Auth("OAUTH2")
    async getAllMealsForUser(context, user, body) {
        return await Meals.find({ownerId: user.id})
    }
}

