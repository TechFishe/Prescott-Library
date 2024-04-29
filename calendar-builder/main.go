package main

import (
	"fmt"
	"log"
	"os"
	"strconv"
	"strings"

	"golang.org/x/text/cases"
	"golang.org/x/text/language"

	"calendar-builder/styles"

	"github.com/charmbracelet/bubbles/textinput"
	"github.com/charmbracelet/lipgloss"

	tea "github.com/charmbracelet/bubbletea"
)

type Model struct {
	day_input   textinput.Model
	month_input textinput.Model
	year_input  textinput.Model
	input_ptr   uint8
	err         string
}

func calc_feb(year string) uint8 {
	year_num, err := strconv.ParseUint(year, 10, 16)
	if err == nil {
		if year_num%4 == 0 {
			if year_num%100 == 0 {
				if year_num%400 == 0 {
					return 29
				} else {
					return 28
				}
			} else {
				return 29
			}
		} else {
			return 28
		}
	}

	return 28
}

func calc_day(day_count int8) (string, int8) {
	switch day_count {
	case 1:
		return "Sunday", day_count + 1
	case 2:
		return "Monday", day_count + 1
	case 3:
		return "Tuesday", day_count + 1
	case 4:
		return "Wednesday", day_count + 1
	case 5:
		return "Thursday", day_count + 1
	case 6:
		return "Friday", day_count + 1
	case 7:
		return "Saturday", day_count + 1
	case 8:
		return "Sunday", 2
	}

	return "", day_count
}

func calc_month(start_day string, month string, year string) string {
	output := "{\n\t"
	output += `"name": "` + cases.Title(language.AmericanEnglish).String(month) + `",` + "\n\t"
	output += `"year": ` + year + ",\n\t"
	output += `"days": ` + "[\n\t\t"

	var (
		past_month_days uint8
		month_days      uint8
		days_past       uint8
		days_future     uint8
		end_day         uint8
		day_count       int8
		day_count_reset uint8
	)
	switch strings.ToLower(month) {
	case "january":
		past_month_days = 30
		month_days = 31
	case "february":
		past_month_days = 31
		month_days = calc_feb(year)
	case "march":
		past_month_days = calc_feb(year)
		month_days = 31
	case "april":
		past_month_days = 31
		month_days = 30
	case "may":
		past_month_days = 30
		month_days = 31
	case "june":
		past_month_days = 31
		month_days = 30
	case "july":
		past_month_days = 30
		month_days = 31
	case "august":
		past_month_days = 31
		month_days = 31
	case "september":
		past_month_days = 31
		month_days = 30
	case "october":
		past_month_days = 30
		month_days = 31
	case "november":
		past_month_days = 31
		month_days = 30
	case "december":
		past_month_days = 30
		month_days = 31
	}

	switch strings.ToLower(start_day) {
	case "sunday":
		days_past = 0
		end_day = 0
		day_count = 1
		day_count_reset = 1
	case "monday":
		days_past = 1
		end_day = 1
		day_count = 2
		day_count_reset = 2
	case "tuesday":
		days_past = 2
		end_day = 2
		day_count = 3
		day_count_reset = 3
	case "wednesday":
		days_past = 3
		end_day = 3
		day_count = 4
		day_count_reset = 4
	case "thursday":
		days_past = 4
		end_day = 4
		day_count = 5
		day_count_reset = 5
	case "friday":
		days_past = 5
		end_day = 5
		day_count = 6
		day_count_reset = 6
	case "saturday":
		days_past = 6
		end_day = 6
		day_count = 7
		day_count_reset = 7
	}

	var date uint8 = past_month_days - days_past + 1
	day_count -= int8(days_past)
	for i := 0; i < int(days_past); i++ {
		day, temp_day_count := calc_day(day_count)

		output += "{\n\t\t\t"
		output += `"day": "` + day + `",` + "\n\t\t\t"
		output += `"light": ` + "true,\n\t\t\t"
		output += `"date": ` + strconv.Itoa(int(date+uint8(i))) + ",\n\t\t\t"
		output += `"event": ` + "false\n\t\t}, "

		day_count = temp_day_count
	}

	day_count = int8(day_count_reset)

	for i := 0; i < int(month_days); i++ {
		day, temp_day_count := calc_day(day_count)

		output += "{\n\t\t\t"
		output += `"day": "` + day + `",` + "\n\t\t\t"
		output += `"light": ` + "false,\n\t\t\t"
		output += `"date": ` + strconv.Itoa(int(i+1)) + ",\n\t\t\t"
		output += `"event": ` + "false\n\t\t}"

		if i+1 != int(month_days) {
			output += ", "
		} else if end_day+1 != 7 {
			output += ", "
		}

		day_count = temp_day_count
		end_day++

		if end_day == 8 {
			end_day = 1
		}
	}

	days_future = 7 - end_day
	for i := 0; i < int(days_future); i++ {
		day, temp_day_count := calc_day(day_count)

		output += "{\n\t\t\t"
		output += `"day": "` + day + `",` + "\n\t\t\t"
		output += `"light": ` + "true,\n\t\t\t"
		output += `"date": ` + strconv.Itoa(int(i+1)) + ",\n\t\t\t"
		output += `"event": ` + "false\n\t\t}"

		if i+1 != int(days_future) {
			output += ", "
		}

		day_count = temp_day_count
	}

	output += "\n\t]"
	output += "\n}"
	return output
}

func start_model() Model {
	di := textinput.New()
	di.CharLimit = 9
	di.Placeholder = "Type here"
	di.Focus()
	di.Width = 16
	di.Cursor.Style = lipgloss.NewStyle().Foreground(styles.Primary)
	di.TextStyle = lipgloss.NewStyle().Foreground(styles.Text)

	mi := textinput.New()
	mi.CharLimit = 9
	mi.Placeholder = "Type here"
	mi.Blur()
	mi.Width = 16
	mi.Cursor.Style = lipgloss.NewStyle().Foreground(styles.Primary)
	mi.TextStyle = lipgloss.NewStyle().Foreground(styles.Text)

	yi := textinput.New()
	yi.CharLimit = 4
	yi.Placeholder = "Type here"
	yi.Blur()
	yi.Width = 16
	yi.Cursor.Style = lipgloss.NewStyle().Foreground(styles.Primary)
	yi.TextStyle = lipgloss.NewStyle().Foreground(styles.Text)

	return Model{
		day_input:   di,
		month_input: mi,
		year_input:  yi,
		input_ptr:   2,
		err:         "",
	}
}

func (m Model) Init() tea.Cmd {
	return nil
}

func (m Model) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {
	case tea.KeyMsg:
		switch msg.Type {
		case tea.KeyEsc, tea.KeyCtrlC:
			return m, tea.Quit
		case tea.KeyUp:
			if m.input_ptr == 2 {
				m.input_ptr = 0
			} else {
				m.input_ptr++
			}
		case tea.KeyDown:
			if m.input_ptr == 0 {
				m.input_ptr = 2
			} else {
				m.input_ptr--
			}
		case tea.KeyEnter:
			day := m.day_input.Value()
			month := m.month_input.Value()
			year := m.year_input.Value()

			if day == "" || month == "" || year == "" {
				m.err = "One or more fields are empty"
			} else {
				err := os.WriteFile(fmt.Sprintf("output/%s-%s.json", cases.Title(language.AmericanEnglish).String(month), year), []byte(calc_month(day, month, year)), 0666)
				if err != nil {
					log.Fatal(err)
				}

				return m, tea.Quit
			}
		}
	}

	var cmd tea.Cmd

	switch m.input_ptr {
	case 2:
		m.day_input.Focus()
		m.month_input.Blur()
		m.year_input.Blur()
		m.day_input, cmd = m.day_input.Update(msg)
	case 1:
		m.day_input.Blur()
		m.month_input.Focus()
		m.year_input.Blur()
		m.month_input, cmd = m.month_input.Update(msg)
	case 0:
		m.day_input.Blur()
		m.month_input.Blur()
		m.year_input.Focus()
		m.year_input, cmd = m.year_input.Update(msg)
	}

	return m, cmd
}

func (m Model) View() string {
	var output string

	output += "What is the first day of the month?\n"
	output += m.day_input.View()
	output += "\n\n"

	output += "What month is it?\n"
	output += m.month_input.View()
	output += "\n\n"

	output += "What year is it?\n"
	output += m.year_input.View()

	output += "\n\n\n"
	output += lipgloss.NewStyle().Foreground(styles.Text).Render("Press enter to submit")

	if m.err != "" {
		output += "\n"
		output += lipgloss.NewStyle().Foreground(lipgloss.Color("#c00000")).Bold(true).Render(m.err)
	}

	return output
}

func main() {
	p := tea.NewProgram(start_model(), tea.WithAltScreen())
	if _, err := p.Run(); err != nil {
		log.Fatal(err)
	}
}
