export type ConstStringUnion = string;

// Environment record with required and optional keys
export type Environment<RequiredKey extends ConstStringUnion, OptionalKey extends ConstStringUnion> = Record<
	RequiredKey,
	string
> & {
	[K in OptionalKey]?: string;
};

// An incomplete environment
export type PartialEnvironment<RequiredKey extends ConstStringUnion, OptionalKey extends ConstStringUnion> = Partial<
	Environment<RequiredKey, OptionalKey>
>;

// A description of keys
export type EnvkeysDescription<KeyUnion extends ConstStringUnion> = Record<KeyUnion, string>;
