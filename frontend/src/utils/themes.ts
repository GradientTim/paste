export const findTheme = (value: string): Theme | undefined =>
	themes.find((theme: Theme): boolean => theme.id === value);

export type Theme = {
	name: string;
	id: string;
};

/*
 * github-dark-default, github-dark-dimmed, github-light-default and vesper are broken :(
 */
export const themes: Theme[] = [
	{ name: "Andromeeda", id: "andromeeda" },
	{ name: "Aurora X", id: "aurora-x" },
	{ name: "Ayu Dark", id: "ayu-dark" },
	{ name: "Catppuccin Frappé", id: "catppuccin-frappe" },
	{ name: "Catppuccin Latte", id: "catppuccin-latte" },
	{ name: "Catppuccin Macchiato", id: "catppuccin-macchiato" },
	{ name: "Catppuccin Mocha", id: "catppuccin-mocha" },
	{ name: "Dark Plus", id: "dark-plus" },
	{ name: "Dracula", id: "dracula" },
	{ name: "Dracula Soft", id: "dracula-soft" },
	{ name: "GitHub Dark", id: "github-dark" },
	// { name: "GitHub Dark Default", id: "github-dark-default" },
	// { name: "GitHub Dark Dimmed", id: "github-dark-dimmed" },
	{ name: "GitHub Light", id: "github-light" },
	// { name: "GitHub Light Default", id: "github-light-default" },
	{ name: "Houston", id: "houston" },
	{ name: "Light Plus", id: "light-plus" },
	{ name: "Material Theme", id: "material-theme" },
	{ name: "Material Theme Darker", id: "material-theme-darker" },
	{ name: "Material Theme Lighter", id: "material-theme-lighter" },
	{ name: "Material Theme Ocean", id: "material-theme-ocean" },
	{ name: "Material Theme Palenight", id: "material-theme-palenight" },
	{ name: "Min Dark", id: "min-dark" },
	{ name: "Min Light", id: "min-light" },
	{ name: "Monokai", id: "monokai" },
	{ name: "Night Owl", id: "night-owl" },
	{ name: "Nord", id: "nord" },
	{ name: "One Dark Pro", id: "one-dark-pro" },
	{ name: "One Light", id: "one-light" },
	{ name: "Poimandres", id: "poimandres" },
	{ name: "Red", id: "red" },
	{ name: "Rosé Pine", id: "rose-pine" },
	{ name: "Rosé Pine Dawn", id: "rose-pine-dawn" },
	{ name: "Rosé Pine Moon", id: "rose-pine-moon" },
	{ name: "Slack Dark", id: "slack-dark" },
	{ name: "Slack Ochin", id: "slack-ochin" },
	{ name: "Snazzy Light", id: "snazzy-light" },
	{ name: "Solarized Dark", id: "solarized-dark" },
	{ name: "Solarized Light", id: "solarized-light" },
	{ name: "Synthwave '84", id: "synthwave-84" },
	{ name: "Tokyo Night", id: "tokyo-night" },
	// { name: "Vesper", id: "vesper" },
	{ name: "Vitesse Black", id: "vitesse-black" },
	{ name: "Vitesse Dark", id: "vitesse-dark" },
	{ name: "Vitesse Light", id: "vitesse-light" },
] as const;
