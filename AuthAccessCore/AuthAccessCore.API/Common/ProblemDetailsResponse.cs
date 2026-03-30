namespace AuthAccessCore.Application.Common
{
    public class ProblemDetailsResponse
    {
        public int Status { get; set; }
        public string Title { get; set; }
        public string Detail { get; set; }
        public string TraceId { get; set; }
        public string Path { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
