import { JetView } from "webix-jet";

export default class FormforEmployeesView extends JetView {
	config() {
		const form = {
			view: "form",
			localId: "form",
			scroll: false,
			elements: [
				{
					view: "text",
					name: "firstname",
					label: "Firstname"
				},
				{
					view: "text",
					name: "surname",
					label: "Surname"
				},
				{
					view: "datepicker",
					label: "Date of Birth",
					labelPosition: "left",
					format: "%d.%m.%Y",
					name: "dateofbirth",
					width: 300,
				},
				{
					view: "text",
					name: "salary",
					label: "Salary"
				},
				{
					cols: [
						{
							view: "button",
							localId: "updateButton",
							value: "Save",
							hotkey: "Enter",
							click: () => {
								const values = this.$getForm().getValues();
								this.onSubmit(values);
							}
						}
					]
				}
			],
			rules: {
				$all: webix.rules.isNotEmpty,
				salary: webix.rules.isNumber
			}
		};

		return {
			view: "window",
			localId: "popup",
			width: 600,
			position: "center",
			modal: true,
			head: {
				view: "toolbar",
				cols: [
					{ template: " ", type: "header", localId: "formTemplate" },
					{
						view: "icon", icon: "wxi-close", click: () => {
							this.$$("popup").hide();
						}
					}
				]
			},
			body: form,
			on: {
				onHide: () => {
					this.$getForm().clear();
					this.$getForm().clearValidation();
				}
			}
		};
	}
	showWindow(values, filled) {
		let formTemplate = this.$$("formTemplate");
		this.getRoot().show();
		if (values) {
			this.$getForm().setValues(values);
			formTemplate.define({ template: "Edit employee" });
		}
		else {
			formTemplate.define({ template: "Add employee" });
		}
		formTemplate.refresh();
		this.onSubmit = function (data) {
			if (this.$getForm().validate()) {
				filled(data);
			}
		};
	}
	init() {
	}
	$getForm() {
		return this.$$("form");
	}
	hide() {
		this.$$("popup").hide();
	}
}