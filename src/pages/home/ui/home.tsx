import { Button, Input } from "@shared/ui"

export const Home = () => {
	return (
		<div className="flex h-lvh w-lvw items-center justify-center">
			<div className="flex w-1/2 flex-col items-center justify-center gap-4">
				<h1 className="text-3xl font-bold underline">Hello world!</h1>
				<Button variant="default">Click Me</Button>
				<Input placeholder="Enter email" />
			</div>
		</div>
	)
}
