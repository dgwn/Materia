import React, {useState, useEffect} from 'react'
import { useQuery } from 'react-query'
import { apiSearchUsers } from '../util/api'
import useDebounce from './hooks/useDebounce'

const initState = () => ({
	searchText: '',
	clicked: false
})

const StudentSearch = ({addUser, debounceTime=300}) => {
	const [state, setState] = useState(initState())
	const debouncedSearchTerm = useDebounce(state.searchText, debounceTime)
	const { data: studentsSearched } = useQuery({
		queryKey: ['student-search',debouncedSearchTerm],
		queryFn: () => apiSearchUsers(debouncedSearchTerm),
		placeholderData: [],
		enabled: !!debouncedSearchTerm && debouncedSearchTerm.length > 0,
		staleTime: Infinity
	})

	// Handles closign the search window immediately on click without debounce delay
	useEffect(() => {
		if (state.clicked && state.searchText?.length > 0) setState({...state, clicked: false})
	}, [state.searchText])

	const onClickMatch = match => {
		setState({searchText: '', clicked: true})
		addUser(match)
	}

	let searchMatchElementsRender = null
	if (!state.clicked && studentsSearched && studentsSearched.filter(res => res.is_student === true).length !== 0) {
		const searchMatchElements = studentsSearched.filter(res => res.is_student === true).map(match => (
			<div key={match.id}
				className='attempts_search_match clickable'
				onClick={() => onClickMatch(match)}>
					<img className='attempts_match_avatar'
						src={match.avatar}
					/>
					<p className={`attempts_match_name ${match.is_student ? 'attempts_match_student' : ''}`}>
						{match.first + ' ' + match.last}
					</p>
			</div>
		))

		searchMatchElementsRender = (
			<div className='attempts_search_list'>
				{ searchMatchElements}
			</div>
		)
	}


	return (
		<div className='search-container'>
			<label htmlFor="attempts-input" className='search-title'>Add students:</label>
			<input
				tabIndex='0' id="attempts-input"
				value={state.searchText}
				onChange={(e) => setState({...state, searchText: e.target.value})}
				type='text'
				placeholder="Enter a Materia user's name or e-mail"
				className='attempts-input'
			/>
			<div>
				{ searchMatchElementsRender }
			</div>
		</div>
	)
}

export default StudentSearch
