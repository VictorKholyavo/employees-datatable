import {JetView} from "webix-jet";

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
				// {
				// 	view: "richselect",
				// 	name: "partOfSpeech",
				// 	label: "Part of speech"
				// },
				{
					cols: [
						{
							view: "button",
							localId: "updateButton",
							value: "Save",
							click: () => {
								const values = this.$getForm().getValues();
								this.onSubmit(values);
							}
						},
						{
							view: "button",
							localId: "closeButton",
							value: "Close",
							click: function () {
								this.getTopParentView().hide();
							}
						}
					]
				}
			],
			rules: {
				$all: webix.rules.isNotEmpty
			}
		};

		return {
			view: "window",
			localId: "popup",
			width: 600,
			position: "center",
			modal: true,
			head: {
				template: " ",
				localId: "formTemplate"
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
			formTemplate.define({template: "Edit word"});
		}
		else {
			formTemplate.define({template: "Add word"});
		}
		formTemplate.refresh();
		this.onSubmit = function(data) {
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