export type ConstStringUnion = string;

export type Environment<
	RequiredKey extends ConstStringUnion,
	OptionalKey extends ConstStringUnion,
> = Record<RequiredKey, string> & {
	[K in OptionalKey]?: string;
};

export type PartialEnvironment<
	RequiredKey extends ConstStringUnion,
	OptionalKey extends ConstStringUnion,
> = Partial<Environment<RequiredKey, OptionalKey>>;

export type EnvkeysDescription<KeyUnion extends ConstStringUnion> = Record<
	KeyUnion,
	string
>;
