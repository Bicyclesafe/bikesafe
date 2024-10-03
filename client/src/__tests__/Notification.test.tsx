import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import Notification from '../components/Notification'

describe("Notification component", () => {
    test("renders component", async () => {
        render(
            <Notification visible={true} message={"This is a notification"}/>
        )
        const notificationText = await screen.findByText('This is a notification')
        expect(notificationText).toBeInTheDocument()
    })

    test("does not render component when visible set to false", async () => {
        const { container } = render(
            <Notification visible={false} message={"This is a notification"}/>
          )
          expect(container.firstChild).toBeNull()
    })
})