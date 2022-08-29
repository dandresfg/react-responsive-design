import { describe, it, expect, beforeAll, afterEach } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import resizeToDefinition from '../utils/test/resizeToDefinition';
import { MediaProvider, Show } from '../lib';

// Breakpoints:
//              "xs": 0,
//              "sm": 600,
//              "md": 900,
//              "lg": 1200,
//              "xl": 1536,
//              "2xl": false
describe('Show Component', () => {
	afterEach(cleanup);

	beforeAll(() => {
		window.resizeTo = resizeToDefinition;
		window.addEventListener('resize', () => console.log(window.innerWidth));
	});

	it('Should render', () => {
		render(
			<MediaProvider>
				<Show media='md'>
					<p>Hello From Show</p>
				</Show>
			</MediaProvider>
		);
		expect(
			screen.getByText('Hello From Show'),
			'Show should render'
		).toBeTruthy();
	}),
		it("Shouldn't work as expected without context", () => {
			const ShowComponent = render(
				<div role='parent'>
					<Show media='md'>
						{' '}
						<p>Hello From Show</p>
					</Show>
				</div>
			);
			const parentComponent = ShowComponent.getByRole('parent');
			//Resize event
			window.resizeTo(300, 500);
			fireEvent(window, new Event('resize'));

			expect(
				parentComponent.getElementsByTagName('p'),
				"Show shouldn't render out of the breakpoint anyways since there's no context"
			).length(0);
		}),
		it("Should render only on 'xs' media query", () => {
			const ShowComponent = render(
				<MediaProvider>
					<div role='parent'>
						<Show media='xs'>
							<p>Hello From Show on Extra Small Query</p>
						</Show>
					</div>
				</MediaProvider>
			);

			const parentComponent = ShowComponent.getByRole('parent');

			//Resize event to xs
			window.resizeTo(500, 500);
			fireEvent(window, new Event('resize'));
			expect(
				ShowComponent.getByText('Hello From Show on Extra Small Query'),
				'Show should render only on Extra Small'
			).toBeTruthy();

			//Resize event out of Extra Small
			window.resizeTo(700, 500);
			fireEvent(window, new Event('resize'));

			expect(
				parentComponent.getElementsByTagName('p'),
				"Show shouldn't render out of Extra Small Breakpoint"
			).length(0);
		}),
		it("Should render only on 'sm' media query", () => {
			const ShowComponent = render(
				<MediaProvider>
					<div role='parent'>
						<Show media='sm'>
							<p>Hello From Show on Small Query</p>
						</Show>
					</div>
				</MediaProvider>
			);

			const parentComponent = ShowComponent.getByRole('parent');

			//Resize event to Small
			window.resizeTo(700, 500);
			fireEvent(window, new Event('resize'));

			expect(
				ShowComponent.getByText('Hello From Show on Small Query'),
				'Show should render only on Small'
			).toBeTruthy();

			//Resize event out of Small
			window.resizeTo(400, 500);
			fireEvent(window, new Event('resize'));

			expect(
				parentComponent.getElementsByTagName('p'),
				"Show shouldn't render out of Small Breakpoint"
			).length(0);
		}),
		it("Should render only on 'md' media query", () => {
			const ShowComponent = render(
				<MediaProvider>
					<div role='parent'>
						<Show media='md'>
							<p>Hello From Show on Medium Query</p>
						</Show>
					</div>
				</MediaProvider>
			);

			const parentComponent = ShowComponent.getByRole('parent');

			//Resize event to Medium Breakpoint
			window.resizeTo(950, 500);
			fireEvent(window, new Event('resize'));

			expect(
				ShowComponent.getByText('Hello From Show on Medium Query'),
				'Show should render only on Medium'
			).toBeTruthy();

			//Resize event to out of Medium Breakpoint
			window.resizeTo(1300, 500);
			fireEvent(window, new Event('resize'));

			expect(
				parentComponent.getElementsByTagName('p'),
				"Show shouldn't render out of Medium Breakpoint"
			).length(0);
		}),
		it("Should render only on 'lg' media query", () => {
			const ShowComponent = render(
				<MediaProvider>
					<div role='parent'>
						<Show media='lg'>
							<p>Hello From Show on Large Query</p>
						</Show>
					</div>
				</MediaProvider>
			);

			const parentComponent = ShowComponent.getByRole('parent');

			//Resize event to Large
			window.resizeTo(1400, 500);
			fireEvent(window, new Event('resize'));

			expect(
				ShowComponent.getByText('Hello From Show on Large Query'),
				'Show should render only on Large'
			).toBeTruthy();

			//Resize event
			window.resizeTo(1100, 500);
			fireEvent(window, new Event('resize'));

			expect(
				parentComponent.getElementsByTagName('p'),
				"Show shouldn't render out of Large Breakpoint"
			).length(0);
		}),
		it("Should render only on 'xl' media query", () => {
			const ShowComponent = render(
				<MediaProvider>
					<div role='parent'>
						<Show media='xl'>
							<p>Hello From Show on Extra Large Query</p>
						</Show>
					</div>
				</MediaProvider>
			);

			const parentComponent = ShowComponent.getByRole('parent');
			//Resize event
			window.resizeTo(1600, 500);
			fireEvent(window, new Event('resize'));

			expect(
				ShowComponent.getByText('Hello From Show on Extra Large Query'),
				'Show should render only on Extra Large'
			).toBeTruthy();

			//Resize event
			window.resizeTo(1400, 500);
			fireEvent(window, new Event('resize'));

			expect(
				parentComponent.getElementsByTagName('p'),
				"Show shouldn't render out of Extra Large Breakpoints"
			).length(0);
		}),
		it("Should render only on '2xl' media query", () => {
			const ShowComponent = render(
				<MediaProvider>
					<div role='parent'>
						<Show media='2xl'>
							<p>Hello From Show on 2 Extra Large Query</p>
						</Show>
					</div>
				</MediaProvider>
			);

			const parentComponent = ShowComponent.getByRole('parent');
			console.log("This test isn't implemented since 2xl is still false");
			// //Resize event
			// window.resizeTo(1600, 500);
			// fireEvent(window, new Event('resize'));

			// expect(
			// 	ShowComponent.getByText('Hello From Show on 2 Extra Large Query'),
			// 	'Show should render only on 2 Extra Large'
			// ).toBeTruthy();

			// //Resize event
			// window.resizeTo(1400, 500);
			// fireEvent(window, new Event("resize"));

			expect(
				parentComponent.getElementsByTagName('p'),
				"Show shouldn't render out of 2 Extra Large Breakpoints"
			).length(0);
		}),
		it("Should render only on 'sm' and 'lg'", () => {
			//This is tricky because sm is from 600 to 900 and lg is 1200 to 1536
			const ShowComponent = render(
				<MediaProvider>
					<div role='parent'>
						<Show media={['sm', 'lg']}>
							<p>Hello From Show on Small and Large</p>
						</Show>
					</div>
				</MediaProvider>
			);
			const parentComponent = ShowComponent.getByRole('parent');

			//More than large so we know that it will render
			expect(window.innerWidth).toBeGreaterThan(1200);
			expect(
				ShowComponent.getByText('Hello From Show on Small and Large'),
				'Show should render on Large'
			).toBeTruthy();

			//Resize event to small breakpoint
			window.resizeTo(700, 500);
			fireEvent(window, new Event('resize'));

			//Greater than small so we know that it will render
			expect(window.innerWidth).toBeGreaterThan(600);

			expect(
				parentComponent.getElementsByTagName('p'),
				'Show should render on Small Breakpoint'
			).length(1);

			//Resize event to the breakpoint range
			window.resizeTo(950, 500);
			fireEvent(window, new Event('resize'));

			//Greater than medium but less than large so we know that it will not render
			expect(window.innerWidth).toBeGreaterThan(900);
			expect(window.innerWidth).toBeLessThan(1200);

			expect(
				parentComponent.getElementsByTagName('p'),
				'Show should not render on all breakpoints between 900px and 1200px'
			).length(0);
		});
});
