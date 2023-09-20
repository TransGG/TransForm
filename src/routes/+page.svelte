<script lang="ts">
	import * as Form from '$lib/components/ui/form';

	import type { SuperValidated } from 'sveltekit-superforms';
	import { schema, type Schema, fields } from './schema';

	export let form: SuperValidated<Schema>;
</script>

<Form.Root method="POST" {form} {schema} let:config>
	{#each fields as field, index (field.name)}
		<Form.Field {config} name={index.toString()}>
			<Form.Item>
				<Form.Label for={index.toString()}>{field.name}</Form.Label>
				<Form.Input id={index.toString()} />
				{#if field.description}
					<Form.Description>{field.description}</Form.Description>
				{/if}
				<Form.Validation />
			</Form.Item>
		</Form.Field>
	{/each}
	<Form.Button type="submit">Submit</Form.Button>
</Form.Root>
