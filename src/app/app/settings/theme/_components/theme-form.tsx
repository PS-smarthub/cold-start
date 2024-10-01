"use client"

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { themeFormSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { z } from "zod";
import { useTheme } from "next-themes";

export function ThemeForm() {
	const theme = useTheme()

	const form = useForm<z.infer<typeof themeFormSchema>>({
		resolver: zodResolver(themeFormSchema),
		defaultValues: {
			theme: theme.theme as "dark" | "light" | undefined
		}
	})

	const onSubmit = form.handleSubmit(async (data) => {
		theme.setTheme(data.theme)
	})

	return (
		< Form {...form}>
			<form onSubmit={onSubmit} className="space-y-8">
				<Card>
					<CardHeader>
						<CardTitle>Tema</CardTitle>
						<CardDescription>Selecione o tema para o painel.</CardDescription>
					</CardHeader>
					<CardContent>
						<FormField
							control={form.control}
							name="theme"
							render={({ field }) => (
								<FormItem className="space-y-1">
									<FormMessage />
									<RadioGroup
										onValueChange={field.onChange}
										defaultValue={field.value}
										className="grid max-w-md grid-cols-2 gap-8 pt-2"
									>
										<FormItem>
											<FormLabel className="[&:has([data-state=checked])>div]:border-primary">
												<FormControl>
													<RadioGroupItem value="light" className="sr-only" />
												</FormControl>
												<div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
													<div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
														<div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
															<div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
															<div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
														</div>
														<div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
															<div className="h-4 w-4 rounded-full bg-[#ecedef]" />
															<div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
														</div>
														<div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
															<div className="h-4 w-4 rounded-full bg-[#ecedef]" />
															<div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
														</div>
													</div>
												</div>
												<span className="block w-full p-2 text-center font-normal">
													Claro
												</span>
											</FormLabel>
										</FormItem>
										<FormItem>
											<FormLabel className="[&:has([data-state=checked])>div]:border-primary">
												<FormControl>
													<RadioGroupItem value="dark" className="sr-only" />
												</FormControl>
												<div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground">
													<div className="space-y-2 rounded-sm bg-slate-950 p-2">
														<div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
															<div className="h-2 w-[80px] rounded-lg bg-slate-400" />
															<div className="h-2 w-[100px] rounded-lg bg-slate-400" />
														</div>
														<div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
															<div className="h-4 w-4 rounded-full bg-slate-400" />
															<div className="h-2 w-[100px] rounded-lg bg-slate-400" />
														</div>
														<div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
															<div className="h-4 w-4 rounded-full bg-slate-400" />
															<div className="h-2 w-[100px] rounded-lg bg-slate-400" />
														</div>
													</div>
												</div>
												<span className="block w-full p-2 text-center font-normal">
													Escuro
												</span>
											</FormLabel>
										</FormItem>
									</RadioGroup>
								</FormItem>
							)}
						/>
					</CardContent>
				</Card>
				<Button disabled={form.formState.isSubmitting} type="submit">
					{form.formState.isSubmitting && "Atualizando..."}
					{!form.formState.isSubmitting && "Atualizar"}
				</Button>
			</form>
		</Form >)
}