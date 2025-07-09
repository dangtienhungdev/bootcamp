import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createTask } from '@/stores/features/todo/todoSlice';
import { useAppDispatch } from '@/stores/hooks';
import { useState } from 'react';

const FormCreate = () => {
	const dispatch = useAppDispatch();
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const [form, setForm] = useState({
		name: '',
		status: false,
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.name === 'name') {
			setForm({
				...form,
				[e.target.name]: e.target.value,
			});
		} else {
			setForm({
				...form,
				[e.target.name]: e.target.checked,
			});
		}
	};

	const handleSubmit = () => {
		const body = {
			title: form.name,
			completed: form.status,
			id: Math.round(Math.random() * 1000),
		};
		dispatch(createTask(body));
		setForm({
			name: '',
			status: false,
		});
		setIsOpen(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<form>
				<DialogTrigger asChild>
					<Button>Thêm mới task</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Thêm mới task</DialogTitle>
						<DialogDescription></DialogDescription>
					</DialogHeader>
					<div className="grid gap-4">
						<div className="grid gap-3">
							<Label htmlFor="name-1">Tên task</Label>
							<Input
								id="name-1"
								name="name"
								placeholder="Nhập tên task"
								onChange={(e) =>
									handleChange(e as React.ChangeEvent<HTMLInputElement>)
								}
							/>
						</div>
						<div className="grid gap-3">
							<Label htmlFor="status-1">Trạng thái task</Label>
							<div className="flex items-center gap-2">
								<Checkbox
									id="status-1"
									name="status"
									onChange={(e) =>
										handleChange(e as React.ChangeEvent<HTMLInputElement>)
									}
									checked={form.status}
								/>
								<Label htmlFor="status-1">Hoàn thành</Label>
							</div>
						</div>
					</div>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Hủy</Button>
						</DialogClose>
						<Button type="submit" onClick={handleSubmit}>
							Thêm mới
						</Button>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	);
};

export default FormCreate;
