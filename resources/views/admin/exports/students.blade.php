<table>
    <thead>
        <tr>
            <th style="font-weight:bolder;font-size:10px;width: 50px;">Name</th>
            <th style="font-weight:bolder;font-size:10px;width: 50px;">Email</th>
            <th style="font-weight:bolder;font-size:10px;width: 50px;">Mobile</th>
            <th style="font-weight:bolder;font-size:10px;width: 60px;">Age</th>
            <th style="font-weight:bolder;font-size:10px;width: 60px;">Preferred Country</th>
            <th style="font-weight:bolder;font-size:10px;width: 60px;">Preferred University</th>
            <th style="font-weight:bolder;font-size:10px;width: 40px;">Date</th>
        </tr>
    </thead>
    <tbody>
        @if (@$students)
            @foreach (@$students as $student)
                <tr>
                    <td style="width: 40px">
                        {{ ucwords($student->name) }}
                    </td>
                    <td style="width: 40px">
                        {{ @$student->email ?: "--" }}
                    </td>
                    <td>
                        {{ @$student->contact_number ?: "--" }}
                    </td>
                    <td>
                        {{ @$session->age?:'--' }}</td>
                    <td>
                        {{ @$student->preffered_country ?: "--" }}
                    </td>
                    <td>
                        {{ @$student->university ?: "--" }}
                    </td>
                    <td>
                        {{ \Carbon\Carbon::parse(@$student->created_at)->format('d M Y') }}
                    </td>
                </tr>
            @endforeach
        @endif
    </tbody>
</table>
